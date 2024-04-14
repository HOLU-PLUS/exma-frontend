export interface UserModel {
  id: number;
  name: string;
  lastName: string;
  email:string;
  iamge:string;
}

/* FORM */
export interface FormUserModel {
  name: string;
  lastName: string;
  email: string;
}

/*VALIDATIONS */
export interface FormUserValidations {
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  email: [(value: string) => boolean, string];
}