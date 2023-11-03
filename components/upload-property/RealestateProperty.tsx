/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
  Alert,
} from 'react-native';
import {ImageModel} from '../../models/image/Image';
import DocumentPicker from 'react-native-document-picker';
import {ValidateFields} from '../../utils/validateFields';
import {MyPropertyService} from '../../services/my-property/MyProperty';
import {useUserContext} from '../../context/User/UserContext';
import {upperCaseUserFullName} from '../../utils/utilsStandAlone';
import DropDownPicker from 'react-native-dropdown-picker';

type RealestatePropertyProps = {
  email: string | undefined;
  closeModal: () => void;
};
const RealestateProperty = ({email, closeModal}: RealestatePropertyProps) => {
  const userContext = useUserContext();
  const [realestateOpened, setRealestateOpened] = useState<boolean>(false);
  const [realestateItems, setRealestateItems] = useState<
    {label: string; value: string}[]
  >([
    {
      label: 'House and Lot',
      value: 'House and Lot',
    },
    {
      label: 'House',
      value: 'House',
    },
    {
      label: 'Lot',
      value: 'Lot',
    },
  ]);
  const [realestateValue, setRealestateValue] =
    useState<string>('House and Lot');

  const [owner, setOwner] = useState<string>('');
  const [downpayment, setDownpayment] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [installmentpaid, setInstallmentpaid] = useState<string>('');
  const [installmentduration, setInstallmentduration] = useState<string>('');
  const [delinquent, setDelinquent] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [developer, setDeveloper] = useState<string>('');

  const [noUploadedFile, setNoUploadedFile] = useState<boolean>(false);
  const [fileInfo, setFileInfo] = useState<ImageModel[]>([]);

  const onOpenGallery = async () => {
    try {
      const files = (await DocumentPicker.pick({
        type: DocumentPicker.types.images,
        allowMultiSelection: true,
      })) as ImageModel[];
      setFileInfo(files);
    } catch (err) {
      console.log(err);
    }
  };

  const onUploadFile = () => {
    var form = new FormData();
    const validate = new ValidateFields({
      email,
      owner,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
    });

    if (validate.checkEmptyFields() && fileInfo.length) {
      Object.values(fileInfo).map(value => {
        form.append('images', value);
      }); // loop the image

      form.append('email', email);
      form.append('realestateType', realestateValue.toLocaleLowerCase());
      form.append('owner', owner);
      form.append('developer', developer);
      form.append('downpayment', downpayment);
      form.append('location', location);
      form.append('installmentpaid', installmentpaid);
      form.append('installmentduration', installmentduration);
      form.append('delinquent', delinquent);
      form.append('description', description);
      const realestateService = new MyPropertyService();
      realestateService
        .uploadRealestate(form)
        .then(response => {
          const {data} = response;
          const {message, code} = data;
          console.log(data);
          if (code === 200) {
            Alert.alert('Message', message);
            // resetForm(); // clear entry form
          } else {
            Alert.alert('Message', message);
          }
        })
        .catch(err => {
          Alert.alert('Message', err.message);
          console.log(err);
        });
    } else {
      Alert.alert('Message', 'Somefields are missing.');
      setNoUploadedFile(true);
    }
  };

  const resetForm = () => {
    setDeveloper('');
    setDownpayment('');
    setLocation('');
    setInstallmentpaid('');
    setInstallmentduration('');
    setDelinquent('');
    setDescription('');
    setFileInfo([]);
  };

  useEffect(() => {
    const ownerFullName = `${userContext?.lastname}, ${userContext?.firstname} ${userContext?.middlename[0]}.`;
    setOwner(ownerFullName);
  }, []);

  function onChangeRealestateType(type: any) {
    console.log(type);
  }
  return (
    <View>
      <DropDownPicker
        open={realestateOpened}
        value={realestateValue}
        items={realestateItems}
        setOpen={setRealestateOpened}
        setValue={setRealestateValue}
        setItems={setRealestateItems}
        zIndex={1}
        style={{marginTop: 5}}
        placeholder={'Select realestate type'}
        onChangeValue={onChangeRealestateType}
      />
      <Text style={style.textLabel}>owner</Text>
      <TextInput
        value={upperCaseUserFullName(owner.trim())}
        onChangeText={setOwner}
        style={style.textInput}
      />
      <Text style={style.textLabel}>developer</Text>
      <TextInput
        value={developer}
        onChangeText={setDeveloper}
        placeholder="Developer"
        style={style.textInput}
      />
      <Text style={style.textLabel}>downpayment</Text>
      <TextInput
        value={downpayment}
        keyboardType={'decimal-pad'}
        onChangeText={setDownpayment}
        style={style.textInput}
      />
      <Text style={style.textLabel}>location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        style={style.textInput}
      />
      <Text style={style.textLabel}>installmentpaid</Text>
      <TextInput
        value={installmentpaid}
        keyboardType={'decimal-pad'}
        onChangeText={setInstallmentpaid}
        style={style.textInput}
      />
      <Text style={style.textLabel}>installmentduration</Text>
      <TextInput
        value={installmentduration}
        onChangeText={setInstallmentduration}
        style={style.textInput}
      />
      <Text style={style.textLabel}>delinquent</Text>
      <TextInput
        value={delinquent}
        onChangeText={setDelinquent}
        style={style.textInput}
      />
      <Text style={style.textLabel}>description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={[style.textInput]}
        multiline
      />

      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderColor: fileInfo.length
            ? 'green'
            : noUploadedFile
            ? 'red'
            : '#000',
          borderWidth: 2,
          marginTop: 10,
        }}>
        <TouchableOpacity onPress={onOpenGallery}>
          <Image
            source={require('../../public/images/def.png')}
            style={{width: 50, height: 50}}
          />
        </TouchableOpacity>
        <Text
          style={{
            paddingLeft: 10,
            fontWeight: '500',
            textTransform: 'capitalize',
            fontSize: 18,
          }}>
          uploaded image({fileInfo?.length})
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{flex: 1}}>
          <Button title="upload" onPress={onUploadFile} />
        </View>
        <Text style={{padding: 5}} />
        <View style={{flex: 1}}>
          <Button
            title="cancel"
            onPress={() => {
              setFileInfo([]);
              closeModal();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  textLabel: {
    textTransform: 'capitalize',
    paddingTop: 5,
    paddingBottom: 5,
  },
});

export default RealestateProperty;
// Uploading of realestate form;
