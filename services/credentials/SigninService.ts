import ResponseData from '../../models/response/Response';
import {
  UpdatePersonalInformation,
  UserSinginModel,
} from '../../models/user/UserModel';
import {instance} from '../../utils/appUtils';

class SigninService {
  constructor() {}
  signinUser(credentialForm: UserSinginModel): Promise<ResponseData<any>> {
    return instance.post('/signin', credentialForm);
  }
  getPassword(userEmail: string): Promise<ResponseData<string>> {
    return instance.get(`signin/getPassword/${userEmail}`);
  }
  updateUserInformation(
    params: UpdatePersonalInformation,
  ): Promise<ResponseData<string>> {
    return instance.post('signin/updateCredentials', params);
  }
}

export default SigninService;
