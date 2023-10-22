import {
  UpdateVehicleInformationModel,
  VehicleAssumption,
} from '../../models/my-property/MyProperty';
import ResponseData from '../../models/response/Response';
import {instance} from '../../utils/appUtils';

export class MyPropertyService {
  uploadVehicle(form: FormData): Promise<ResponseData<any>> {
    return instance.post('/my-property/vehicle', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  getActiveUserProperties(
    email: string | undefined,
  ): Promise<ResponseData<[]>> {
    return instance.get('/my-property/vehicles/' + email);
  }
  getCertainVehicle(
    vehicleID: number,
  ): Promise<ResponseData<VehicleAssumption>> {
    return instance.get(`my-property/certain-vehicle/${vehicleID}`);
  }
  updateCertainVehicleProperty(vehicleInfo: UpdateVehicleInformationModel) {
    return instance.post('my-property/update-certain-vehicle', vehicleInfo);
  } // vehicle
  removeCertainVehicleProperty(vehicleID: number) {
    return instance.delete('my-property/remove-certain-vehicle/' + vehicleID);
  }
  listAssumerOfMyProperty(propertyId: number) {
    return instance.get('my-property/list-assumer/' + propertyId);
  }
}
