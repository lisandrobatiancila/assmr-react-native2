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

export interface CertainRealestate {
  realestate_id: number;
  realestate_userId: number;
  realestate_owner: string;
  realestate_realestateType: string;
  realestate_location: string;
  realestate_downpayment: string;
  realestate_installmentpaid: string;
  realestate_installmentduration: string;
  realestate_delinquent: string;
  realestate_description: string;
  realestate_isDropped: string;
}

export interface CertainJewelry {
  jewelry_id: number;
  jewelry_propertyId: number;
  jewelry_jewelry_owner: string;
  jewelry_jewelry_name: string;
  jewelry_jewelry_model: string;
  jewelry_jewelry_downpayment: string;
  jewelry_jewelry_location: string;
  jewelry_jewelry_delinquent: string;
  jewelry_jewelry_installmentpaid: string;
  jewelry_jewelry_installmentduration: string;
  jewelry_jewelry_description: string;
  jewelry_jewelry_karat: string;
  jewelry_jewelry_grams: string;
  jewelry_jewelry_material: string;
  jewelry_jewelry_image: string;
  jewelry_isDropped: string;
  jewelry_userId: number;
  user_id: number;
  user_email: string;
  user_firstname: string;
  user_middlename: string;
  user_lastname: string;
  user_contactno: string;
  user_gender: string;
  user_municipality: string;
  user_province: string;
  user_barangay: string;
}
export interface HouseAndLot {
  hal_id: number;
  hal_realestateId: number;
  hal_developer: string;
  hal_hal_front_image: string;
  hal_hal_rightside_image: string;
  hal_hal_leftside_image: string;
  hal_hal_back_image: string;
  hal_hal_document_image: string;
}

export interface House {
  house_id: number;
  house_realestateId: number;
  house_developer: string;
  house_house_front_image: string;
  house_house_rightside_image: string;
  house_house_leftside_image: string;
  house_house_back_image: string;
  house_house_document_image: string;
}

export interface Lot {
  lot_id: number;
  lot_realestateId: number;
  lot_lot_image: string;
  lot_lot_document_image: string;
}
