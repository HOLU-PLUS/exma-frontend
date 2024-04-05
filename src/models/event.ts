import { GuestModel, PaymentModel, StageTypeModel, ThethModel } from ".";

export interface EventModel {
  id: number;
  description: string;
  date: Date;
  totalAmount: number;
  state: string;
  stageType: StageTypeModel;
  patient: GuestModel;
  payments: PaymentModel[];
  thethIds: ThethModel[];
  amountDue: number;
}

/* FORM */
export interface FormTreatmenttModel {
  stageTypeId: StageTypeModel | null;
  patientId: GuestModel | null;
  description: string;
  date: Date | null;
  totalAmount: number;
  thethIds: ThethModel[];
}

/*VALIDATIONS */
export interface FormTreatmentValidations {
  stageTypeId: [(value: StageTypeModel[]) => boolean, string];
  patientId: [(value: GuestModel[]) => boolean, string];
  description: [(value: string) => boolean, string];
  date: [(value: Date) => boolean, string];
  totalAmount: [(value: number) => boolean, string];
  thethIds: [(value: ThethModel[]) => boolean, string];
}