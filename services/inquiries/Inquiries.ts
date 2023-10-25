import {InquiriesModel} from '../../models/inquiries/InquiriesModel';
import {instance} from '../../utils/appUtils';

export class InquiriesService {
  sendInquiries(param: InquiriesModel) {
    return instance.post('inquiries/send-inquiry', param);
  }
  getAllInquiries(userId: number) {
    return instance.get('inquiries/get-inquiries' + userId);
  }
}
