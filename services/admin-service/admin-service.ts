import {instance} from '../../utils/appUtils';

export class AdminService {
  getAllFeedBack() {
    return instance.get('/feedback/user-feed');
  }
  getHitories() {
    return instance.get('/admin/histories');
  }
}
