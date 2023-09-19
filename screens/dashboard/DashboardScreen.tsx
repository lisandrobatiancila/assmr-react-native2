import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from "./settings/Settings";
import FeedBackScreen from './feedback/Feedback';
import MyPropertiesScreen from './my-property/MyProperty';
import MessageScreen from './messages/Messages';
import InquiriesScreen from './inquiries/Inquiries';
import DashViewScreen from './dash/DashViewScreen';

const Drawer = createDrawerNavigator();

const DashBoardScreen = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='DashboardView' component={ DashViewScreen } options={{ title: "Dashboard" }} />
            <Drawer.Screen name='My Property' component={ MyPropertiesScreen } />
            <Drawer.Screen name='Feedback' component={ FeedBackScreen } />
            <Drawer.Screen name='Messages' component={ MessageScreen } />
            <Drawer.Screen name='Inquiries' component={ InquiriesScreen } />
            <Drawer.Screen name='Settings' component={ SettingsScreen } />
        </Drawer.Navigator>
    );
}

export default DashBoardScreen;