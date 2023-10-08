/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './screens/home/HomeScreen';
import SignupScreen from './screens/home/SignupScreen';
import SigninScreen from './screens/home/SigninScreen';
import {LoadingProvider} from './context/Loading/LoadingContext';
import UserProvider from './context/User/UserContext';
import DashBoardScreen from './screens/dashboard/DashboardScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import PropertiesScreen from './screens/properties/PropertiesScreen';
import { MenuProvider } from 'react-native-popup-menu';
import AssumptionForm from './screens/properties/assumptions/assume-index';
import { ViewVehicleInfo } from './screens/properties/assumptions/viewindex';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();
const MyDrawer = createDrawerNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    // <SafeAreaView style={backgroundStyle}>
    //   <StatusBar
    //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
    //     backgroundColor={backgroundStyle.backgroundColor}
    //   />
    <MenuProvider>
      <GestureHandlerRootView style={{flex: 1}}>
      <UserProvider>
      <LoadingProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={SignupScreen}
              options={{title: 'Assmr Sigup'}}
            />
            <Stack.Screen
              name="Signin"
              component={SigninScreen}
              options={{title: 'Assmr Signin'}}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashBoardScreen}
              options={{title: 'Dashboard', headerShown: false}}
            />
            <Stack.Screen
              name="Properties"
              component={PropertiesScreen}
              options={{headerBackVisible: false}}
            />
            <Stack.Screen
              name="AssumptionForm"
              component={ AssumptionForm }
            />
            <Stack.Screen
              name="ViewVehicleInfo"
              component={ ViewVehicleInfo }
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LoadingProvider>
    </UserProvider>
      </GestureHandlerRootView>
    </MenuProvider>
    //</SafeAreaView>
  );
}

export default App;
