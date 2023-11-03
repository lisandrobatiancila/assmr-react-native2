/* eslint-disable react/no-unstable-nested-components */
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
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
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
import { ViewMyVehicle } from './screens/dashboard/my-property/vehicle/ViewMyVehicle';
import { UpdateMyVehicle } from './screens/dashboard/my-property/vehicle/UpdateMyVehicle';
import { AssumedProperty } from './screens/dashboard/assumed-property/AssumedProperty';
import { ChatWithOtherUser } from './screens/dashboard/messages/chat-with';
import AssmrModal from './components/modal/Modal';
import { ModalProvider } from './context/Modal/ModalContext';
import { DisplayAssumerList } from './screens/dashboard/my-property/assumer-list';
import { InquireProperties } from './screens/inquire-property';
import { ViewMyJewelry } from './screens/dashboard/my-property/jewelry/ViewMyJewelry';
import { UpdateMyJewelry } from './screens/dashboard/my-property/jewelry/UpdateMyJewelry';
import { ViewMyRealestate } from './screens/dashboard/my-property/realestate/ViewMyRealestate';
import { UpdateMyRealestate } from './screens/dashboard/my-property/realestate/UpdateMyRealestate';
import { TextContainer } from './components/Text/Text';
import { FlexRow } from './components/Flex-Row/styles';
import { APP_COLOR } from './constants/colorConstant';
import { SearchComponent } from './components/search/SearchComponent';
import SearchProvider, { useSearchContext } from './context/Search/SearchContext';
import { ViewRealestateInfo } from './screens/properties/assumptions/viewrealestate';
import { ViewJewelryInfo } from './screens/properties/assumptions/viewjewelry';
import { AdminHome } from './screens/admin/Admin';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();
const MyDrawer = createDrawerNavigator();

function App(): JSX.Element {
  const searchContext = useSearchContext();
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
        <ModalProvider>
          <LoadingProvider>
            <SearchProvider>
              <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                  <Stack.Screen
                    name={'Admin'}
                    component={AdminHome}
                    options={{
                      headerShown: false,
                    }}
                  />
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
                    options={{headerBackVisible: false, headerTitle: () =>
                      <SearchComponent />,
                    }}
                  />
                  <Stack.Screen
                    name="AssumptionForm"
                    component={ AssumptionForm }
                  />
                  <Stack.Screen
                    name="ViewVehicleInfo"
                    component={ ViewVehicleInfo }
                    options={{
                      headerTitle: 'Vehicle Info',
                    }}
                  />
                  <Stack.Screen
                    name="ViewRealestateInfo"
                    component={ ViewRealestateInfo }
                    options={{
                      headerTitle: 'Realestate Info',
                    }}
                  />
                  <Stack.Screen
                    name="ViewJewelryInfo"
                    component={ ViewJewelryInfo }
                    options={{
                      headerTitle: 'Realestate Info',
                    }}
                  />
                  <Stack.Screen
                    name="ViewMyVehicle"
                    component={ViewMyVehicle}
                    options={{
                      headerTitle: 'Vehicle',
                    }}
                  />
                  <Stack.Screen
                    name="ViewMyJewelry"
                    component={ViewMyJewelry}
                    options={{
                      headerTitle: 'Jewelry',
                    }}
                  />
                  <Stack.Screen
                    name="ViewMyRealestate"
                    component={ViewMyRealestate}
                    options={{
                      headerTitle: 'Realestate',
                    }}
                  />
                  <Stack.Screen
                    name="UpdateMyVehicle"
                    component={UpdateMyVehicle}
                    options={{headerTitle: 'Update Vehicle'}}
                  />
                  <Stack.Screen
                    name="UpdateMyJewelry"
                    component={UpdateMyJewelry}
                    options={{headerTitle: 'Update Jewelry'}}
                  />
                  <Stack.Screen
                    name="UpdateMyRealestate"
                    component={UpdateMyRealestate}
                    options={{headerTitle: 'Update Realestate'}}
                  />
                  <Stack.Screen
                    name="IChatWith"
                    component={ChatWithOtherUser}
                    options={{headerTitle: 'Chat With'}}
                  />
                  <Stack.Screen
                    name="ListAllAssumer"
                    component={DisplayAssumerList}
                    options={{headerTitle: 'Assumers'}}
                  />
                  <Stack.Screen
                    name="InquireProperty"
                    component={InquireProperties}
                    options={{headerBackTitle: 'Property Inquiries'}}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SearchProvider>
          </LoadingProvider>
        </ModalProvider>
      </UserProvider>
      </GestureHandlerRootView>
    </MenuProvider>
    //</SafeAreaView>
  );
}

export default App;
