import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {CardContainer} from '../../../components/card/Card';
import {TextContainer} from '../../../components/Text/Text';
import {WHITE_COLOR} from '../../../constants/colorConstant';
import {TextInputContainer} from '../../../components/TextInput/TextInput';
import {useUserContext} from '../../../context/User/UserContext';
import {upperCaseUserFullName} from '../../../utils/utilsStandAlone';
import {TouchableContainer} from '../../../components/Touchable';
import SigninService from '../../../services/credentials/SigninService';

const SettingsScreen = () => {
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
  }, []);

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
  return (
    <ScrollView>
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
            />
            <TextInputContainer
              value={middlename}
              onChangeText={setMiddlename}
              placeholder={'Middlename'}
            />
            <TextInputContainer
              value={lastname}
              onChangeText={setLastname}
              placeholder={'Lastname'}
            />
            <TextInputContainer
              value={contactno}
              onChangeText={setContactno}
              placeholder={'Contactno'}
            />

            <TextContainer
              fontWeight={'700'}
              fontSize={'18px'}
              padding={'10px'}
              textAlign={'left'}
              text={'Address Information'}
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
              disabled
            />
            <TextInputContainer
              value={password}
              onChangeText={setPassword}
              placeholder={'Pass******'}
              secureTextEntry={true}
            />
            <TextInputContainer
              value={retypePassword}
              onChangeText={setRetypePassword}
              placeholder={'Re-type Pass******'}
              secureTextEntry={true}
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
    </ScrollView>
  );
};

export default SettingsScreen;

const style = StyleSheet.create({
  rootContainer: {
    padding: 5,
  },
});
