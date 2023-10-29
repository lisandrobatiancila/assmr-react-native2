/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import {CardContainer} from '../../../components/card/Card';
import {TextContainer} from '../../../components/Text/Text';
import {WHITE_COLOR} from '../../../constants/colorConstant';
import {TextInputContainer} from '../../../components/TextInput/TextInput';
import {useUserContext} from '../../../context/User/UserContext';
import {upperCaseUserFullName} from '../../../utils/utilsStandAlone';
import {TouchableContainer} from '../../../components/Touchable';
import SigninService from '../../../services/credentials/SigninService';
import DropDownPicker from 'react-native-dropdown-picker';
import {instance} from '../../../utils/appUtils';

const SettingsScreen = () => {
  const [openCity, setOpenCity] = useState<boolean>(false);
  const [cityValue, setCityValue] = useState<string>('');
  const [cityItems, setCityItems] = useState<any>([]);
  const [openProvince, setOpenProvince] = useState<boolean>(false);
  const [provinceValue, setProvinceValue] = useState<string>('');
  const [provinceItems, setProvinceItems] = useState<any>([]);
  const [openBarangay, setOpenBarangay] = useState<boolean>(false);
  const [barangayValue, setBarangayValue] = useState<string>('');
  const [barangayItems, setBarangayItems] = useState<
    {label: string; value: string}[]
  >([]);

  const [refesh, setRefresh] = useState<boolean>(false);

  const signinService = new SigninService();

  const userContext = useUserContext();
  const [firstname, setFirstname] = useState<string>(
    upperCaseUserFullName(userContext?.firstname ?? 'unknown'),
  );
  const [middlename, setMiddlename] = useState<string>(
    upperCaseUserFullName(userContext?.middlename ?? 'unknown'),
  );
  const [lastname, setLastname] = useState<string>(
    upperCaseUserFullName(userContext?.lastname ?? 'unknown'),
  );
  const [contactno, setContactno] = useState<string>(
    userContext?.contactno ?? '+63',
  );
  const [email, setEmail] = useState<string>(userContext?.email ?? 'unknown');
  const [password, setPassword] = useState<string>('');
  const [retypePassword, setRetypePassword] = useState<string>('');

  useEffect(() => {
    getPassword()
      .then(response => {
        const {data} = response;
        const {code, message} = data;
        if (code !== 200) {
          Alert.alert('Message', message);
        }
        setPassword(data.data);
        setRetypePassword(password);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Message', err.message);
      });
    getSystemAddress();
  }, [refesh]);
  function getPassword() {
    return signinService.getPassword(userContext?.email ?? 'unknown');
  }
  function onUpdateUserInformation() {
    const params = {
      firstname,
      middlename,
      lastname,
      contactno,
      email,
      password,
      municipality: provinceValue,
      province: cityValue, // murag nagka bali2x akoa address
      barangay: barangayValue,
    };

    signinService
      .updateUserInformation(params)
      .then(response => {
        const {data} = response;
        const {code, message} = data;
        if (code !== 200) {
          Alert.alert('Message', message);
          return;
        }
        Alert.alert('Message', message);
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Message', err.message);
      });
  }
  const onRefreshSettings = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };
  function getSystemAddress() {
    try {
      instance
        .get('/address')
        .then(response => {
          const address = response.data.data.province;
          setProvinceItems(address);
          const userAddress = userContext?.address;
          const splittedAdd = userAddress?.split(',');
          setProvinceValue(splittedAdd ? splittedAdd[0].trim() : '');
          const userDefaultProv = splittedAdd ? splittedAdd[0].trim() : '';
          const userDefaultMuni = splittedAdd ? splittedAdd[1].trim() : '';
          const userDefaultBrgy = splittedAdd ? splittedAdd[2].trim() : '';

          const muni = address.filter(
            (add: any) => add.province === userDefaultProv,
          );
          setCityItems(muni[0].municipality);
          setCityValue(splittedAdd ? splittedAdd[1].trim() : '');

          const brgy = muni[0].municipality.filter(
            (m: any) => m.name === userDefaultMuni,
          );
          setBarangayValue(userDefaultBrgy);
          setBarangayItems(brgy[0].barangay);
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      ToastAndroid.show('Something went wrong', ToastAndroid.LONG);
    }
  }
  function onChangeProvince(province: any) {
    const muni = provinceItems.filter(
      (prov: any) => prov.province === province,
    );
    setCityValue('');
    setBarangayValue('');
    setBarangayItems([]);
    if (muni.length > 0) {
      setCityItems(muni[0].municipality);
      if (muni[0].municipality.length > 0) {
        setCityValue(muni[0].municipality[0].name);
        setBarangayValue(muni[0].municipality[0].barangay[0].barangay);
      }
    }
  }
  function onChangeMunicipality(municipality: any) {
    const brgy = cityItems.filter((city: any) => city.name === municipality);
    if (brgy.length > 0) {
      if (brgy[0].barangay.length > 0) {
        if (brgy[0].length > 0) {
          setBarangayItems(brgy[0].barangay);
          setBarangayValue(brgy[0].barangay[0].barangay);
        }
      }
    }
  }
  function renderSettingItem() {
    return (
      <View style={style.rootContainer}>
        <CardContainer backgroundColor={WHITE_COLOR} padding={'10px'}>
          <View>
            <TextContainer
              fontWeight={'700'}
              fontSize={'18px'}
              padding={'10px'}
              textAlign={'left'}
              text={'Personal Information'}
            />
            <TextInputContainer
              value={firstname}
              onChangeText={setFirstname}
              placeholder={'Firstname'}
              width={'100%'}
            />
            <TextInputContainer
              value={middlename}
              onChangeText={setMiddlename}
              placeholder={'Middlename'}
              width={'100%'}
            />
            <TextInputContainer
              value={lastname}
              onChangeText={setLastname}
              placeholder={'Lastname'}
              width={'100%'}
            />
            <TextInputContainer
              value={contactno}
              onChangeText={setContactno}
              placeholder={'Contactno'}
              width={'100%'}
            />

            <TextContainer
              fontWeight={'700'}
              fontSize={'18px'}
              padding={'10px'}
              textAlign={'left'}
              text={'Address Information'}
            />
            <TextContainer
              text={'Province'}
              textAlign={'left'}
              fontWeight={'500'}
              fontSize={'16px'}
            />
            <DropDownPicker
              key={3}
              open={openProvince}
              items={provinceItems}
              value={provinceValue}
              setOpen={setOpenProvince}
              setItems={setProvinceItems}
              setValue={setProvinceValue}
              placeholder={provinceValue}
              schema={{
                label: 'province',
                value: 'province',
              }}
              listMode={'SCROLLVIEW'}
              zIndex={3}
              onChangeValue={onChangeProvince}
            />
            <TextContainer
              text={'City / Municipality'}
              textAlign={'left'}
              fontWeight={'500'}
              fontSize={'16px'}
            />
            <DropDownPicker
              key={2}
              open={openCity}
              items={cityItems}
              value={cityValue}
              setOpen={setOpenCity}
              setItems={setCityItems}
              setValue={setCityValue}
              placeholder={cityValue}
              zIndex={2}
              listMode={'SCROLLVIEW'}
              schema={{
                label: 'name',
                value: 'name',
              }}
              onChangeValue={onChangeMunicipality}
            />
            <TextContainer
              text={'Barangay'}
              textAlign={'left'}
              fontWeight={'500'}
              fontSize={'16px'}
            />
            <DropDownPicker
              key={1}
              open={openBarangay}
              items={barangayItems}
              value={barangayValue}
              setOpen={setOpenBarangay}
              setItems={setBarangayItems}
              setValue={setBarangayValue}
              placeholder={barangayValue}
              zIndex={1}
              schema={{
                label: 'barangay',
                value: 'barangay',
              }}
            />
            <TextContainer
              fontWeight={'700'}
              fontSize={'18px'}
              padding={'10px'}
              textAlign={'left'}
              text={'Account Information'}
            />
            <TextInputContainer
              value={email}
              onChangeText={setEmail}
              placeholder={'Email'}
              width={'100%'}
              disabled
            />
            <TextInputContainer
              value={password}
              onChangeText={setPassword}
              placeholder={'Pass******'}
              width={'100%'}
              secureTextEntry={true}
            />
            <TextInputContainer
              value={retypePassword}
              onChangeText={setRetypePassword}
              placeholder={'Re-type Pass******'}
              secureTextEntry={true}
              width={'100%'}
            />
          </View>
          <TouchableContainer
            borderRadius={'5px'}
            margin={'10px 0 0 0'}
            padding={'10px'}
            onPress={onUpdateUserInformation}>
            <TextContainer
              color={WHITE_COLOR}
              fontWeight={'600'}
              textTransform={'capitalize'}
              text={'update information'}
            />
          </TouchableContainer>
        </CardContainer>
      </View>
    );
  }
  return (
    <RefreshControl refreshing={refesh} onRefresh={onRefreshSettings}>
      <FlatList data={[1]} renderItem={renderSettingItem} />
    </RefreshControl>
  );
};

export default SettingsScreen;

const style = StyleSheet.create({
  rootContainer: {
    padding: 5,
  },
});
