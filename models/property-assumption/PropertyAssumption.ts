import { MyVehiclePropertyModel } from '../my-property/MyProperty';

interface OwnerInformationModel {
  id: number,
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  address: string;
  email: string;
} // displaying properties, ready for assumption

export interface VehicleAssumptionModel extends OwnerInformationModel {
  vehicleInfo: MyVehiclePropertyModel;
} // for displaying properties, ready for assumption
