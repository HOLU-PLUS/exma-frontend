export interface ActivityModel {
  id: number;
  name: string;
  description: string;
  start: Date|null;
  end: Date|null;
}

/* FORM */
export interface FormActivityModel {
  id?:number;
  name: string;
  description: string;
  start: Date | null;
  end: Date | null;
}

/*VALIDATIONS */
export interface FormActivityValidations {
  name: [(value: string) => boolean, string];
  description: [(value: string) => boolean, string];
  start: [(value: Date) => boolean, string];
  end: [(value: Date) => boolean, string];
}