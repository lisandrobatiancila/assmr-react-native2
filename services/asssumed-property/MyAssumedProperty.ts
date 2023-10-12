import {instance} from '../../utils/appUtils';

export class MyAssumedPropertyService {
  getAllMyAssumedVehiclePropety(userId: number) {
    return instance.get('assumed-property/vehicle-assumed-property/' + userId);
  }
  removeAssumedProperty(ID: number) {
    return instance.post('assumed-property/vehicle-user-removed-assumption', {
      assumptionID: ID,
    });
  } // assumerID same as id
}
