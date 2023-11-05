export interface UserSignupModel {
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  gender: string | null;
  municipality: string | null;
  province: string | null;
  barangay: string | null;
  email: string;
  password: string;
}

export interface UserSinginModel {
  email: string;
  password: string;
}
export interface ActiveUserCredentialsModel {
  data: {
    email: string;
    firstname: string;
    middlename: string;
    lastname: string;
    address: string;
  };
}

export interface ActiveUserInformation {
  userId: number;
  setUserId: (userId: number) => void;
  email: string;
  setEmail: (email: string) => void;
  firstname: string;
  setFirstname: (firstname: string) => void;
  middlename: string;
  setMiddlename: (middlename: string) => void;
  lastname: string;
  setLastname: (lastname: string) => void;
  contactno: string;
  setContactno: (contactno: string) => void;
  address: string;
  setAddress: (address: string) => void;
  underMaintenance: boolean;
  setUnderMaintenance: (underMaintenance: boolean) => void;
  password: string;
  setPassword: (password: string) => void;
}

export interface LoadingBarModel {
  isLoading: boolean;
  setIsLoading: (param: boolean) => void;
}
export interface UpdatePersonalInformation {
  firstname: string;
  middlename: string;
  lastname: string;
  contactno: string;
  email: string;
  password: string;
}