import axios from "axios";
import ResponseData from "../../models/response/Response";
import {instance} from "../../utils/appUtils";
import { UserSignupModel } from "../../models/user/UserModel";

class SignupService {
    constructor() {

    }
    saveRecord(userForm: UserSignupModel): Promise<ResponseData<[]>> {
        return instance.post("/signup", userForm)
    }
}

export default SignupService;   