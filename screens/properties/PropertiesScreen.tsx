/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import {VehicleProperties} from './vehicles';
import {useUserContext} from '../../context/User/UserContext';

type PropertiesScreenProps = {
  navigation: any;
};

const PropertiesScreen = ({navigation}: PropertiesScreenProps) => {
  const userContext = useUserContext();
  BackHandler.addEventListener('hardwareBackPress', () => {
    const index = navigation.getState().index;
    if (index === 2 && userContext?.email) {
      navigation.navigate('Dashboard');
    }
  });
  const onDashboard = () => {
    navigation.navigate('Dashboard');
  };
  return (
    <View style={style.screenContainer}>
      <VehicleProperties navigation={navigation} />
      <View style={{padding: 10, zIndex: 100}}>
        <TouchableOpacity
          style={[style.homeContainer, {padding: 10}]}
          onPress={onDashboard}>
          {/* <View style={[style.shadowProp, {padding: 10}]} /> */}
          <Image
            source={require('../../public/images/home.png')}
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  screenContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: 5,
    backgroundColor: '#EE4D2D',
    height: '100%',
    justifyContent: 'space-between',
  },
  homeContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -50,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {width: 5, height: 4},
    shadowOpacity: 10,
    shadowRadius: 100,
  },
});
export default PropertiesScreen;
