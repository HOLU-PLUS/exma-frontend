import { UserModel } from ".";

export interface SpeakerModel {
  id: number;
  ci: string;
  user: UserModel;
}

/* FORM */
export interface FormSpeakerModel {
  identityCard: number;
  name: string;
  lastName: string;
  phone: number;
  birthDate: Date | null;
  gender: string;
  allergies: string;
  bloodType: string;
}

/*VALIDATIONS */
export interface FormSpeakerValidations {
  identityCard: [(value: number) => boolean, string];
  name: [(value: string) => boolean, string];
  lastName: [(value: string) => boolean, string];
  phone: [(value: number) => boolean, string];
  birthDate: [(value: Date) => boolean, string];
  gender: [(value: string) => boolean, string];
  allergies: [(value: string) => boolean, string];
  bloodType: [(value: string) => boolean, string];
}