import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from "./settings/Settings";
import FeedBackScreen from './feedback/Feedback';
import MyPropertiesScreen from './my-property/MyProperty';
import MessageScreen from './messages/Messages';
import InquiriesScreen from './inquiries/Inquiries';
import DashViewScreen from './dash/DashViewScreen';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useUserContext } from '../../context/User/UserContext';

const Drawer = createDrawerNavigator();
const TheDrawerHeader = (props: any) => {
    const userContext = useUserContext();
    
    return (
        <DrawerContentScrollView {...props }>
            <View style = { style.drawerContainer }>
                <Image source={require("../../public/images/user.png")} alt={"Profile Avatar"}
                    style = {{width: 100, height: 100}} />
                <View style={{padding: 5, marginTop: 10}}>
                    <Text style={{textTransform: "capitalize", fontSize: 18, color: "#fff"}}>Name: {userContext?.lastname}, { userContext?.firstname} {userContext?.middlename[0]}.</Text>
                    <Text style={{color: "#fff"}}>Email: {userContext?.email}</Text>
                </View>
            </View>
            <DrawerItemList { ...props } />
        </DrawerContentScrollView>
    )
}
const DashBoardScreen = () => {
    return (
        <Drawer.Navigator drawerContent={ props =>  <TheDrawerHeader {...props } /> }>
            <Drawer.Screen name='DashboardView' component={ DashViewScreen } options={{ title: "Dashboard" }} />
            <Drawer.Screen name='My Property' component={ MyPropertiesScreen } />
            <Drawer.Screen name='Feedback' component={ FeedBackScreen } />
            <Drawer.Screen name='Messages' component={ MessageScreen } />
            <Drawer.Screen name='Inquiries' component={ InquiriesScreen } />
            <Drawer.Screen name='Settings' component={ SettingsScreen } />
        </Drawer.Navigator>
    );
}

const style = StyleSheet.create({
    drawerContainer: {
        height: 200,
        backgroundColor: "#EE4D2D",
        padding: 10,
        marginTop: -5,
        alignItems: "center"
    }
})
export default DashBoardScreen;