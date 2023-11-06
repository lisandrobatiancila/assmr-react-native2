import {instance} from '../../utils/appUtils';

export class AdminService {
  getAllFeedBack() {
    return instance.get('/feedback/user-feed');
  }
  getHitories(historyValue: string) {
    return instance.post('/admin/histories', {historyValue});
  } // getHistories by values
}
