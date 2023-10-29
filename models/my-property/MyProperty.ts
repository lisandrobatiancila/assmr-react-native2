export interface MyVehiclePropertyModel {
  vehicle_id: number;
  vehicle_userId: number;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_owner: string;
  vehicle_downpayment: string;
  vehicle_location: string;
  vehicle_installmentpaid: string;
  vehicle_installmentduration: string;
  vehicle_delinquent: string;
  vehicle_description: string;
  vehicle_isDropped: string;
  vehicle_image_id: number;
  vehicle_image_vehicleId: number;
  vehicle_image_vehicleFrontIMG: string;
  vehicle_image_vehicleRightIMG: string;
  vehicle_image_vehicleLeftIMG: string;
  vehicle_image_vehicleBackIMG: '';
  vehicle_image_vehicleCRIMG: string;
  vehicle_image_vehicleORIMG: string;
  totalAssumption: number;
} // used this when fetching vehicle properties from DB

export interface MyVehicleIMGModel {
  id: number;
  vehicleID: number;
  vehicleFrontIMG: string;
  vehicleRightIMG: string;
  vehicleLeftIMG: string;
  vehicleBackIMG: string;
  vehicleCRIMG: string;
  vehicleORIMG: string;
} // used this when fetching vehicle images from DB

export interface VehicleAssumption {
  vehicle_id: number;
  vehicle_userId: number;
  vehicle_brand: string;
  vehicle_model: string;
  vehicle_owner: string;
  vehicle_downpayment: string;
  vehicle_location: string;
  vehicle_installmentpaid: string;
  vehicle_installmentduration: string;
  vehicle_delinquent: string;
  vehicle_description: string;
  vehicle_isDropped: string;
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
  vehicleImages_id: number;
  vehicleImages_vehicleId: number;
  vehicleImages_vehicleFrontIMG: string;
  vehicleImages_vehicleRightIMG: string;
  vehicleImages_vehicleLeftIMG: string;
  vehicleImages_vehicleBackIMG: string;
  vehicleImages_vehicleCRIMG: string;
  vehicleImages_vehicleORIMG: string;
}

export interface UpdateVehicleInformationModel {
  id: number; // vehicleID
  brand: string;
  model: string;
  owner: string;
  downpayment: string;
  location: string;
  installmentpaid: string;
  installmentduration: string;
  delinquent: string;
  description: string;
}

export interface AssumerListModel {
  assumer_id: number;
  assumer_userId: number;
  assumer_assumer_income: string;
  assumer_assumer_work: string;
  asmpt_id: number;
  asmpt_userId: number;
  asmpt_property_id: number;
  asmpt_assumerId: number;
  asmpt_propowner_id: number;
  asmpt_isActive: string;
  asmpt_transaction_date: string;
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
