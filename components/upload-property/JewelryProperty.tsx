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
import {TextContainer} from '../Text/Text';
import {CardContainer} from '../card/Card';
import {WHITE_COLOR} from '../../constants/colorConstant';

type JewelryPropertyProps = {
  email: string | undefined;
  closeModal: () => void;
};
const JewelryProperty = ({email, closeModal}: JewelryPropertyProps) => {
  const userContext = useUserContext();
  const [jewelryName, setJewelryName] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [owner, setOwner] = useState<string>('');
  const [downpayment, setDownpayment] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [installmentpaid, setInstallmentpaid] = useState<string>('');
  const [installmentduration, setInstallmentduration] = useState<string>('');
  const [delinquent, setDelinquent] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [noUploadedFile, setNoUploadedFile] = useState<boolean>(false);
  const [karat, setKarat] = useState<string>('');
  const [grams, setGrams] = useState<string>('');
  const [material, setMaterial] = useState<string>('');

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
      jewelryName,
      model,
      owner,
      downpayment,
      location,
      installmentpaid,
      installmentduration,
      delinquent,
      karat,
      grams,
      material,
    });

    if (validate.checkEmptyFields() && fileInfo.length) {
      Object.values(fileInfo).map(value => {
        form.append('images', value);
      }); // loop the image

      form.append('email', email);
      form.append('jewelryName', jewelryName);
      form.append('jewelryModel', model);
      form.append('owner', owner);
      form.append('downpayment', downpayment);
      form.append('location', location);
      form.append('installmentpaid', installmentpaid);
      form.append('installmentduration', installmentduration);
      form.append('delinquent', delinquent);
      form.append('description', description);
      form.append('karat', karat);
      form.append('grams', grams);
      form.append('material', material);

      const jewelryService = new MyPropertyService();
      jewelryService
        .uploadJewelry(form)
        .then(response => {
          const {data} = response;
          const {message, status} = data;

          if (status === 200) {
            Alert.alert('Message', message);
            // resetForm(); // clear entry form
          } else {
            Alert.alert('Message', message);
          }
        })
        .catch(err => {
          Alert.alert('Message', err.message);
          console.log(err.message);
        });
    } else {
      Alert.alert('Message', 'Somefields are missing.');
      setNoUploadedFile(true);
    }
  };

  const resetForm = () => {
    setJewelryName('');
    setModel('');
    setOwner('');
    setDownpayment('');
    setLocation('');
    setInstallmentpaid('');
    setInstallmentduration('');
    setDelinquent('');
    setDescription('');
    setFileInfo([]);
    setKarat('');
    setGrams('');
    setMaterial('');
  };

  useEffect(() => {
    const ownerFullName = `${userContext?.lastname}, ${userContext?.firstname} ${userContext?.middlename[0]}.`;
    setOwner(ownerFullName);
  }, []);

  return (
    <View>
      <Text style={style.textLabel}>name</Text>
      <TextInput
        value={jewelryName}
        onChangeText={setJewelryName}
        style={style.textInput}
      />
      <Text style={style.textLabel}>model</Text>
      <TextInput
        value={model}
        onChangeText={setModel}
        style={style.textInput}
      />
      <Text style={style.textLabel}>owner</Text>
      <TextInput
        value={upperCaseUserFullName(owner.trim())}
        onChangeText={setOwner}
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
      <TextContainer
        text={'Other Jewelry Description'}
        textAlign={'left'}
        margin={'5px 0'}
      />

      <CardContainer padding={'10px'} backgroundColor={'teal'}>
        <TextContainer
          text={'karat'}
          textAlign={'left'}
          textTransform={'capitalize'}
        />
        <TextInput
          value={karat}
          style={{backgroundColor: WHITE_COLOR, borderRadius: 5, marginTop: 5}}
          onChangeText={setKarat}
        />
        <TextContainer
          text={'grams'}
          textAlign={'left'}
          textTransform={'capitalize'}
        />
        <TextInput
          value={grams}
          style={{backgroundColor: WHITE_COLOR, borderRadius: 5, marginTop: 5}}
          onChangeText={setGrams}
        />
        <TextContainer
          text={'material'}
          textAlign={'left'}
          textTransform={'capitalize'}
        />
        <TextInput
          value={material}
          style={{backgroundColor: WHITE_COLOR, borderRadius: 5, marginTop: 5}}
          onChangeText={setMaterial}
        />
      </CardContainer>

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

export default JewelryProperty;
