import {PropertyAssumptionModel} from '../../models/property-assumption/PropertyAssumption';
import ResponseData from '../../models/response/Response';
import {instance} from '../../utils/appUtils';

export class PropertyAssumptions {
  getVehiclePropertyInfo(vehicleID: number) {
    return instance.get(`/property-assumptions/vehicle-info/${vehicleID}`);
  }
  submitAssumption(assumpForm: PropertyAssumptionModel) {
    return instance.post(
      '/property-assumptions/property-submit-form-assumption',
      assumpForm,
    );
  }
  getCertainVehicle(vehicleId: number) {
    return instance.get(`/property-assumptions/certain-vehicle/${vehicleId}`);
  }
  getCertainRealestate(realestateID: number, realestateType: string) {
    return instance.get(
      `/property-assumptions/certain-realestate/${realestateID}/${realestateType}`,
    );
  }
  getCertainJewelry(jewelryID: number) {
    return instance.get(`/property-assumptions/certain-jewelry/${jewelryID}`);
  }
}
