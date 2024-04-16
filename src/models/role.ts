import { PermissionModel } from ".";

export interface RoleModel {
  id: number;
  name: string;
  permissions: PermissionModel[];
}

/* FORM */
export interface FormRoleModel {
  name: string;
  permissions: PermissionModel[];
}

/*VALIDATIONS */
export interface FormRoleValidations {
  name: [(value: string) => boolean, string];
  permissions: [(value: PermissionModel[]) => boolean, string];
}