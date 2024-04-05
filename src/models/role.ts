import { PermissionModel } from ".";

export interface RoleModel {
  id: number;
  name: string;
  permissions: PermissionModel[];
}

/* FORM */
export interface FormRoleModel {
  name: string;
  permissionIds: PermissionModel[];
}

/*VALIDATIONS */
export interface FormRoleValidations {
  name: [(value: string) => boolean, string];
  permissionIds: [(value: PermissionModel[]) => boolean, string];
}