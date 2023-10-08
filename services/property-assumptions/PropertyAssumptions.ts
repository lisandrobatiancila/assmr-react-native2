import {PropertyAssumptionModel} from '../../models/property-assumption/PropertyAssumption';
import {instance} from '../../utils/appUtils';

export class PropertyAssumptions {
  getVehiclePropertyInfo(vehicleID: number) {
    return instance.get(`/property-assumptions/vehicle-info/${vehicleID}`);
  }
  submitAssumption(assumpForm: PropertyAssumptionModel) {
    return instance.post(
      '/property-assumptions/vehicle-assumption',
      assumpForm,
    );
  }
  getCertainVehicle(vehicleId: number) {
    return instance.get(`/property-assumptions/certain-vehicle/${vehicleId}`);
  }
}
