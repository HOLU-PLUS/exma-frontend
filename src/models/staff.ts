import { FormUserModel, FormUserValidations, RoleModel, UserModel } from ".";


export interface StaffModel extends UserModel{
  id: number;
  role: RoleModel;
}

/* FORM */
export interface FormAdministratorModel extends FormUserModel {
  role: RoleModel | null;
}

/*VALIDATIONS */
export interface FormAdministratorValidations extends FormUserValidations {
  role: [(value: RoleModel) => boolean, string];
}