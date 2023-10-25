/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {LoadingContext} from '../../context/Loading/LoadingContext';
import Loading from '../../components/Loading/Loading';
import SignupService from '../../services/credentials/SignupService';
import {instance} from '../../utils/appUtils';
import ResponseData from '../../models/response/Response';
import {UserSignupModel} from '../../models/user/UserModel';

const SignupScreen = () => {
  var signupService = new SignupService(); // initialized SignupService;

  const [genderItems, setGenderItems] = useState<
    {label: string; value: string}[]
  >([
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
  ]);

  const [genderOpen, setGenderOpen] = useState<boolean>(false);
  const [genderValue, setGenderValue] = useState(null); // hold the value in onChange
  const {isLoading, setIsLoading} = useContext(LoadingContext);

  const [address, setAddress] = useState<AddressModel>(); // holdItems
  const [provinceItems, setProvinceItems] = useState<
    {label: string; value: string; barangay: any; name: string}[]
  >([]); // holdItems
  const [municipalityItems, setMunicipalityItems] = useState<
    {
      key: string;
      label: string;
      value: string;
      province: string;
      municipality: any;
    }[]
  >([]); // holdItems
  const [barangayItems, setBarangayItems] = useState<
    {label: string; value: string; name: any}[]
  >([]); // holdItems

  const [municipalityValue, setMunicipalityValue] = useState(null);
  const [provinceValue, setProvinceValue] = useState(null);
  const [barangayValue, setBarangayValue] = useState(null);

  const [provinceOpen, setProvinceOpen] = useState<boolean>(false);
  const [municipalityOpen, setMunicipalityOpen] = useState<boolean>(false);
  const [barangayOpen, setBarangayOpen] = useState<boolean>(false);
  // setIsLoading(true)

  useEffect(() => {
    try {
      instance
        .get('/address')
        .then(response => {
          const {data} = response;

          setAddress(data.data);
          setMunicipalityItems(data.data.province);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []); // municipality / city

  const [firstname, setFirstname] = useState<string>('');
  const [middlename, setMiddlename] = useState<string>('');
  const [lastname, setLastname] = useState<string>('');
  const [contactno, setContactno] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  useEffect(() => {
    try {
      instance
        .get('/address')
        .then(response => {
          const {data} = response;
          setAddress(data.data);
          setMunicipalityItems(data.data.province);
          setIsLoading(false);
        })
        .catch(err => {
          setIsLoading(false);
        });
    } catch (err) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, []); // municipality / city

  const municipalityChangeValue = () => {
    const municipality = municipalityItems?.filter(
      (value, index) => value.province === municipalityValue,
    );
    if (municipality && municipality[0]?.municipality.length > 0) {
      setProvinceItems(municipality[0]?.municipality);
    } else {
      setProvinceItems([]);
    }
  }; // provinces

  const provinceChangeValue = () => {
    const province = provinceItems.filter(
      (value, index) => value?.name === provinceValue,
    );
    if (province && province.length > 0) {
      setBarangayItems(province[0].barangay);
    } else {
      setBarangayItems([]);
    }
  }; // barangays

  const onSaveRecord = () => {
    const signupForm: UserSignupModel = {
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      contactno: contactno,
      gender: genderValue,
      municipality: municipalityValue,
      province: provinceValue,
      barangay: barangayValue,
      email: email.toLocaleLowerCase(),
      password: password,
    };
    signupService
      .saveRecord(signupForm)
      .then((response: ResponseData<[]>) => {
        const {data} = response;
        const {message}: any = data;

        Alert.alert('Message', message, [
          {
            text: 'Ok',
            onPress: () => {
              onResetForm();
            },
          },
        ]);
      })
      .catch(err => {
        Alert.alert('Message', err.message);
      });
  };

  const onResetForm = () => {
    setFirstname('');
    setMiddlename('');
    setLastname('');
    setContactno('');
    setEmail('');
    setPassword('');
  };

  return (
    <View>
      {isLoading ? <Loading text="Please wait..." /> : ''}
      <FlatList
        data={[1]}
        nestedScrollEnabled={true}
        renderItem={({item}) => (
          <>
            <View style={style.singupContainer}>
              {/* BASIC INFORMATION */}
              <View>
                <Text
                  style={{
                    color: '#fff',
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    letterSpacing: 1.5,
                    marginTop: 2,
                    marginBottom: 2,
                  }}>
                  basic information
                </Text>
                <View style={{marginLeft: 10}}>
                  <TextInput
                    value={firstname}
                    onChangeText={setFirstname}
                    style={style.textInputBG}
                    placeholder="Firstname"
                  />
                  <TextInput
                    value={middlename}
                    onChangeText={setMiddlename}
                    style={style.textInputBG}
                    placeholder="Middlename"
                  />
                  <TextInput
                    value={lastname}
                    onChangeText={setLastname}
                    style={style.textInputBG}
                    placeholder="Lastname"
                  />
                  <TextInput
                    value={contactno}
                    onChangeText={setContactno}
                    style={style.textInputBG}
                    keyboardType={'phone-pad'}
                    placeholder="Contactno."
                    maxLength={11}
                  />
                  <DropDownPicker
                    zIndex={5}
                    open={genderOpen}
                    value={genderValue}
                    items={genderItems}
                    setOpen={setGenderOpen}
                    setValue={setGenderValue}
                    setItems={setGenderItems}
                    placeholder="Gender"
                    style={{marginTop: 5}}
                  />
                </View>
              </View>
              {/* ADDRESS INFORMATION */}
              <View>
                <Text
                  style={{
                    color: '#fff',
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    letterSpacing: 1.5,
                    marginTop: 2,
                    marginBottom: 2,
                  }}>
                  address information
                </Text>
                <View style={{marginLeft: 10}}>
                  <DropDownPicker
                    zIndex={4}
                    open={municipalityOpen}
                    value={municipalityValue}
                    items={municipalityItems}
                    setOpen={setMunicipalityOpen}
                    setValue={setMunicipalityValue}
                    schema={{
                      label: 'province',
                      value: 'province',
                    }}
                    placeholder="Municipality / City"
                    listMode={'SCROLLVIEW'}
                    scrollViewProps={{
                      nestedScrollEnabled: true,
                    }}
                    onChangeValue={municipalityChangeValue}
                  />
                  <DropDownPicker
                    zIndex={3}
                    open={provinceOpen}
                    value={provinceValue}
                    items={provinceItems}
                    setOpen={setProvinceOpen}
                    setValue={setProvinceValue}
                    setItems={setProvinceItems}
                    placeholder="Province"
                    schema={{
                      label: 'name',
                      value: 'name',
                    }}
                    style={{marginTop: 5}}
                    onChangeValue={provinceChangeValue}
                  />
                  <DropDownPicker
                    zIndex={2}
                    open={barangayOpen}
                    value={barangayValue}
                    items={barangayItems}
                    setOpen={setBarangayOpen}
                    setValue={setBarangayValue}
                    setItems={setBarangayItems}
                    placeholder="Barangay"
                    schema={{
                      label: 'barangay',
                      value: 'barangay',
                    }}
                    style={{marginTop: 5}}
                  />
                </View>
              </View>
              {/* ACCOUNT INFORMATION */}
              <View>
                <Text
                  style={{
                    color: '#fff',
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    letterSpacing: 1.5,
                    marginTop: 2,
                    marginBottom: 2,
                  }}>
                  account information
                </Text>
                <View style={{marginLeft: 10}}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={style.textInputBG}
                    keyboardType={'email-address'}
                    placeholder="Email"
                  />
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    style={style.textInputBG}
                    secureTextEntry
                    placeholder="******"
                  />
                </View>
              </View>
              {/* Actions */}
              <View style={{flexDirection: 'row', padding: 10, marginTop: 5}}>
                <View style={{flex: 1}}>
                  <Button title="save" onPress={onSaveRecord} />
                </View>
                <Text style={{padding: 5}} />
                <View style={{flex: 1}}>
                  <Button title="reset" onPress={onResetForm} />
                </View>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  singupContainer: {
    backgroundColor: '#EE4D2D',
    height: '100%',
    padding: 10,
  },

  textInputBG: {
    backgroundColor: '#fff',
    marginTop: 5,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default SignupScreen;
