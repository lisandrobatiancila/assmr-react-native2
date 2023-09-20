import ResponseData from "../../models/response/Response";
import instance from "../../utils/appUtils";

export class MyPropertyService {
    uploadVehicle(form: FormData): Promise<ResponseData<any>> {
        return instance.post("/my-property/vehicle", form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}