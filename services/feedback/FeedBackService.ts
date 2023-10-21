import {UserFeedBacksModel} from '../../models/feedbacks/FeedBacks';
import ResponseData from '../../models/response/Response';
import {instance} from '../../utils/appUtils';

export class FeedBackService {
  sendUserFeedBacks(param: UserFeedBacksModel): Promise<ResponseData<string>> {
    return instance.post('feedback/user-feed', param);
  }
  getAllUserFeedBacks() {
    return instance.get('feedback/user-feed');
  }
}
