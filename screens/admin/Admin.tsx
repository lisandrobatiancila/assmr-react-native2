import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AdminHistory} from './history/History';
import {AdminReports} from './reports/AdminReports';
import { AdminFeedBack } from './feedback/AdminFeedBack';

const Drawer = createDrawerNavigator();

export const AdminHome = () => {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Admin Dashboard" component={AdminReports} />
        <Drawer.Screen name="History" component={AdminHistory} />
        <Drawer.Screen name="Feedback" component={AdminFeedBack} />
      </Drawer.Navigator>
    </>
  );
};
