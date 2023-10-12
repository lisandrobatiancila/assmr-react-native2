import React from 'react';
import {View} from 'react-native';
import {useUserContext} from '../../../context/User/UserContext';
import {UnderMaintenance} from '../../../components/maintenance/UnderMaintanance';

const DashViewScreen = () => {
  const userContext = useUserContext();

  return (
    <View>{userContext?.underMaintenance ? <UnderMaintenance /> : 'okay'}</View>
  );
};

export default DashViewScreen;
