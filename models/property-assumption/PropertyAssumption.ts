import {MyVehiclePropertyModel} from '../my-property/MyProperty';

interface OwnerInformationModel {
  id: number;
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  address: string;
  email: string;
} // displaying properties, ready for assumption

export interface PropertyAssumptionModel {
  userID?: number;
  propertyID?: number;
  ownerID?: number;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  contactno?: string;
  address?: string;
  job?: string;
  monthSalary?: string;
} // used by generic assumption either Vehicle, Jewelry, HouseAndLot, Lot, House

export interface VehicleAssumptionModel extends OwnerInformationModel {
  vehicleInfo: MyVehiclePropertyModel;
} // for displaying properties, ready for assumption

export interface CertainVehicleModel {
  userId: number;
  brand: string;
  model: string;
  owner: string;
  downpayment: string;
  location: string;
  installmentpaid: string;
  delinquent: string;
  description: string;
  vehicleImages_id: number;
  vehicleImages_vehicleBackIMG: string;
  vehicleImages_vehicleCRIMG: string;
  vehicleImages_vehicleFrontIMG: string;
  vehicleImages_vehicleId: number;
  vehicleImages_vehicleLeftIMG: number;
  vehicleImages_vehicleORIMG: number;
  vehicleImages_vehicleRightIMG: number;
}
