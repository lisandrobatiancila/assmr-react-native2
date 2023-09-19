import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingsScreen from "./settings/Settings";

const Drawer = createDrawerNavigator();

const DashBoardScreen = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='Settings' component={ SettingsScreen } />
        </Drawer.Navigator>
    );
}

export default DashBoardScreen;