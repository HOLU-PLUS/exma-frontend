import { ActivityModel } from ".";

export interface EventModel {
  id: number;
  name: string;
  description: string;
  price:number;
  start: Date;
  end: Date;
  activities: ActivityModel[];
}

/* FORM */
export interface FormEventModel {
  name: string;
  description: string;
  price: number;
  start: Date | null;
  end: Date | null;
  activities: ActivityModel[];
}

/*VALIDATIONS */
export interface FormEventValidations {
  name: [(value: string) => boolean, string];
  description: [(value: string) => boolean, string];
  price: [(value: number) => boolean, string];
  start: [(value: Date) => boolean, string];
  end: [(value: Date) => boolean, string];
  activities: [(value: ActivityModel[]) => boolean, string];
}