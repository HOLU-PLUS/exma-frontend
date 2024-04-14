import { FormUserModel, FormUserValidations, UserModel } from ".";

export interface SpeakerModel extends UserModel {
  id: number;
  ci: string;
}

/* FORM */
export interface FormSpeakerModel extends FormUserModel {
  ci: string;
}

/*VALIDATIONS */
export interface FormSpeakerValidations extends FormUserValidations {
  ci: [(value: string) => boolean, string];
}