import {ToastAndroid} from 'react-native';
import {NotificationModel} from '../models/notifications/Notification';
import notifee from '@notifee/react-native';

export const upperCaseUserFullName = (fullName: string) => {
  const name = fullName.split(' ');
  let newFullName = '';
  for (let i = 0; i < name.length; i++) {
    newFullName +=
      name[i].substring(0, 1).toUpperCase() +
      name[i].substring(1, name[i].length) +
      ' ';
  }

  return newFullName;
};
export const upperCaseWord = (fullName: string) => {
  const name = fullName.split(' ');
  let newFullName = '';
  for (let i = 0; i < name.length; i++) {
    newFullName +=
      name[i].substring(0, 1).toUpperCase() +
      name[i].substring(1, name[i].length) +
      ' ';
  }

  return newFullName;
};


export const formatDate = (param: string): string => {
  let date = new Date(param);
  let year = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(date);
  let month = new Intl.DateTimeFormat('en', {month: 'short'}).format(date);
  let day = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(date);
  const formattedDate = `${month}. ${day}, ${year}`;

  return formattedDate;
};

export const displayNotifications = (param: NotificationModel[]) => {
  const {data}: any = param;
  try {
    data.map(async (record: NotificationModel, idx: number) => {
      const channelId = await notifee.createChannel({
        id: idx.toString(),
        name: `notif-channel-${idx}`,
      });
      await notifee.displayNotification({
        title: record.notification_notificationType,
        body: record.notification_notificationContent,
        android: {
          channelId,
          pressAction: {
            id: idx.toString(),
          },
        },
      });
    });
  } catch (error) {
    ToastAndroid.show('Im handled through notif.', ToastAndroid.LONG);
  }
};
