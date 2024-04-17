import { RequestModel } from ".";

export interface AvailabilityModel {
  id: number;
  start: Date;
  end: Date;
  requests: RequestModel[];
}

/* FORM */
export interface FormAvailabilityModel {
  start: Date|null;
  end: Date|null;
}

/*VALIDATIONS */
export interface FormAvailabilityValidations {
  start: [(value: Date) => boolean, string];
  end: [(value: Date) => boolean, string];
}