import ResponseData from "../../models/response/Response";
import { ActiveUserCredentialsModel, UserSinginModel } from "../../models/user/UserModel";
import instance from "../../utils/appUtils";

class SigninService {
    constructor() {
        
    }
    signinUser(credentialForm: UserSinginModel): Promise<ResponseData<any>> {
        return instance.post("/signin", credentialForm)
    }
}

export default SigninService;