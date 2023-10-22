/* eslint-disable @typescript-eslint/no-unused-vars */
import {useUserContext} from '../../context/User/UserContext';
import {NotificationModel} from '../../models/notifications/Notification';
import ResponseData from '../../models/response/Response';
import {ActiveUserInformation} from '../../models/user/UserModel';
import {instance} from '../../utils/appUtils';

export class AssmrNotifications {
  constructor() {}
  getNotifications(
    activeUserId: number,
  ): Promise<ResponseData<NotificationModel[]>> {
    try {
      return instance.get(`notifications/push-notif/${activeUserId}`);
    } catch (err) {
      console.log('I got catched');
      const prom = new Promise<ResponseData<NotificationModel[]>>(
        (resolve, reject) => {
          resolve({
            code: 0,
            status: 0,
            message: '',
            data: [],
          });
        },
      );
      return prom;
    }
  }
}
