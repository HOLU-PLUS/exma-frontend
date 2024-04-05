import { UserModel } from ".";

export interface GuestModel {
  id: number;
  codeQr: string;
  user: UserModel;
}

/* FORM */
export interface FormGuestModel {
  name: string;
  lastName: string;
  email: string;
}

/*VALIDATIONS */
export interface FormGuestValidations {
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
}