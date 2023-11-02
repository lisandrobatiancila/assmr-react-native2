import {
  UpdateJewelryInformationModel,
  UpdateRealestateInformationModel,
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
    return instance.get(`/my-property/vehicles/${email}`);
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
  listAssumerOfMyProperty(propertyId: number, propertyType: string) {
    return instance.get(
      'my-property/list-assumer/' + propertyId + '/' + propertyType,
    );
  }
  removeAssumer(assumerId: number) {
    return instance.patch(`/my-property/remove-assumer/${assumerId}`);
  }
  getActiveUserJewelry(email: string): Promise<ResponseData<[]>> {
    return instance.get(`/my-property/jewelry/${email}`);
  }
  uploadJewelry(form: FormData) {
    return instance.post('/my-property/jewelry', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } // jewelry
  getCertainJewelry(
    jewelryID: number,
  ): Promise<ResponseData<VehicleAssumption>> {
    return instance.get(`my-property/certain-jewelry/${jewelryID}`);
  } // get certain vehicle
  getCertainJewelryForUpdate(
    jewelryID: number,
  ): Promise<ResponseData<VehicleAssumption>> {
    return instance.get(`my-property/certain-jewelry/${jewelryID}`);
  }
  updateCertainJewelryProperty(jewelryInfo: UpdateJewelryInformationModel) {
    return instance.post('my-property/update-certain-jewelry', jewelryInfo);
  }
  removeCertainJewelryProperty(jewelryID: number) {
    return instance.delete('my-property/remove-certain-jewelry/' + jewelryID);
  } // remove certain jewelry
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
  getActiveUserRealestate(email: string, realeEstateType: string) {
    return instance.get(`/my-property/realestate/${realeEstateType}/${email}`);
  }
  uploadRealestate(form: FormData) {
    return instance.post('/my-property/realestate', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
<<<<<<< Updated upstream
=======
  getCertainRealestate(realestateID: number, realestateType: string) {
    return instance.get(
      `my-property/certain-realestate/${realestateType}/${realestateID}`,
    );
  }
  updateCertainRealestateProperty(
    realestateInfo: UpdateRealestateInformationModel,
  ) {
    return instance.post(
      'my-property/update-certain-realestate',
      realestateInfo,
    );
  }
  removeCertainRealestate(realestateID: number) {
    return instance.delete(
      `my-property/remove-certain-realestate/${realestateID}`,
    );
  }
>>>>>>> Stashed changes
>>>>>>> Stashed changes
}
