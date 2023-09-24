export interface MyVehiclePropertyModel {
    id: number,
    userID?: number,
    brand: string,
    model: string,
    owner: string,
    downpayment: string,
    location: string,
    installmentpaid: string,
    installmentduration: string,
    delinquent: string,
    description: string,
    vehicleIMG: MyVehicleIMGModel[]
} // used this when fetching vehicle properties from DB

export interface MyVehicleIMGModel {
    id: number,
    vehicleID: number,
    vehicleFrontIMG: string,
    vehicleRightIMG: string,
    vehicleLeftIMG: string,
    vehicleBackIMG: string,
    vehicleCRIMG: string,
    vehicleORIMG: string
} // used this when fetching vehicle images from DB