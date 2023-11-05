/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {AdminHistory} from './history/History';
import {AdminReports} from './reports/AdminReports';
import {AdminFeedBack} from './feedback/AdminFeedBack';
import {TextContainer} from '../../components/Text/Text';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUserContext} from '../../context/User/UserContext';
import {TouchableContainer} from '../../components/Touchable';
import {APP_COLOR, WHITE_COLOR} from '../../constants/colorConstant';
import { AdminSubscriber } from './subscriber/AdminSubscriber';

const Drawer = createDrawerNavigator();

function AdminDrawerHeader(props: any) {
  const userContext = useUserContext();
  const onLogOut = () => {
    props.navigation.navigate('Signin');
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={style.drawerContainer}>
        <Image
          source={require('../../public/images/user.png')}
          alt={'Profile Avatar'}
          style={{width: 100, height: 100}}
        />
        <View style={{padding: 5, marginTop: 10}}>
          <Text
            style={{textTransform: 'capitalize', fontSize: 18, color: '#fff'}}>
            Name: {userContext?.lastname}, {userContext?.firstname}{' '}
            {userContext?.middlename[0]}.
          </Text>
          <Text style={{color: '#fff'}}>Email: {userContext?.email}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />

      <View
        style={{
          height: Dimensions.get('window').height - 350,
          position: 'relative',
        }}>
        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
          <TouchableContainer
            padding={'10px'}
            backgroundColor={APP_COLOR}
            onPress={onLogOut}>
            <TextContainer
              text={'logout'}
              textAlign={'left'}
              textTransform={'capitalize'}
              color={WHITE_COLOR}
            />
          </TouchableContainer>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
export const AdminHome = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContent={props => <AdminDrawerHeader {...props} />}>
        <Drawer.Screen name="Admin Dashboard" component={AdminReports} />
        <Drawer.Screen name="History" component={AdminHistory} />
        <Drawer.Screen name="Feedback" component={AdminFeedBack} />
        <Drawer.Screen name="Subscriber" component={AdminSubscriber} />
      </Drawer.Navigator>
    </>
  );
};

const style = StyleSheet.create({
  drawerContainer: {
    height: 200,
    backgroundColor: '#EE4D2D',
    padding: 10,
    marginTop: -5,
    alignItems: 'center',
  },
});
