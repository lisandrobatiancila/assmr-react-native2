/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {useUserContext} from '../../context/User/UserContext';
import {AssmrNotifications} from '../../services/notifications/Notifications';
import {APP_NOTIF_TIMER} from '../../constants/appConstants';
import {displayNotifications} from '../../utils/utilsStandAlone';

type HomeProps = {
  navigation: any;
};

const HomeScreen = ({navigation}: HomeProps) => {
  let TO: any = null;
  const userContext = useUserContext();
  const notifService = new AssmrNotifications();
  useEffect(() => {
    callNotifications();
    if (userContext?.email) {
      navigation.navigate('Dashboard');
    }
  }, [userContext?.userId]);

  function callNotifications() {
    try {
      TO = setTimeout(async () => {
        const resp = await notifService.getNotifications(
          userContext?.userId ?? 0,
        );

        const {data} = resp;
        displayNotifications(data); // this trigger to display the notifications
        callNotifications();
      }, APP_NOTIF_TIMER);
    } catch (err) {
      ToastAndroid.show('Something went wrong :: notif', ToastAndroid.LONG);
    }
  }

  const onSignup = () => {
    navigation.navigate('Signup');
  };
  const onSignin = () => {
    navigation.navigate('Signin');
  };
  return (
    <View style={style.homeContainer}>
      <View style={style.componentContainer}>
        {/* LOGO */}
        <View />
        {/* GROUP NAME */}
        <View style={{marginTop: 10, marginBottom: 30}}>
          <Text style={style.appName}>assmr</Text>
          <Text style={style.appDescription}>
            an online platform for reposessed properties
          </Text>
        </View>
        {/* BUTTONS */}
        <View style={style.buttonContainer}>
          <View style={{flex: 1, marginRight: 2}}>
            <TouchableOpacity style={style.buttonSignup} onPress={onSignup}>
              <Text style={style.signupText}>sign up</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, marginLeft: 2}}>
            <TouchableOpacity style={style.buttonSignin} onPress={onSignin}>
              <Text style={style.signinText}>sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  homeContainer: {
    backgroundColor: '#EE4D2D',
    height: '100%',
  },
  componentContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
  },
  appName: {
    fontSize: 50,
    color: '#fff',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  appDescription: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: 20,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSignup: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  signupText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSignin: {
    backgroundColor: '#fff',
    borderRadius: 100,
    paddingTop: 10,
    paddingBottom: 10,
  },
  signinText: {
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
export default HomeScreen;
