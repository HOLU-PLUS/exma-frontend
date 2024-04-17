import { UserModel } from "./user";

export interface RequestModel {
  id: number;
  user: UserModel;
  start: Date;
  end: Date;
}