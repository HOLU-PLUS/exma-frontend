import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface GuestModel extends UserModel{
  id: number;
  codeQr: string;
}

/* FORM */
export interface FormGuestModel extends FormUserModel{
}

/*VALIDATIONS */
export interface FormGuestValidations extends FormUserValidations {
}