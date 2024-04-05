import { ComponentButton } from "@/components"
import { Stack, SvgIcon } from "@mui/material"
import { useCallback, useState } from "react";
import { StaffCreate, StaffTable } from ".";
import { Add } from "@mui/icons-material";
import { StaffModel, PermissionModel } from "@/models";
import { useAuthStore } from "@/hooks";

export const StaffView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<StaffModel | null>(null);
  const { roleUser } = useAuthStore();

  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = useCallback((value: boolean) => {
    if (!value) setItemEdit(null)
    setopenDialog(value);
  }, []);
  return (
    <>
      <Stack
        direction="row"
        justifyContent="end"
      >
        <ComponentButton
          text="Nuevo administrador"
          onClick={() => handleDialog(true)}
          startIcon={<SvgIcon fontSize="small"><Add /></SvgIcon>}
          disable={!roleUser.permissions.find((permission: PermissionModel) => permission.name === "crear administradores")}
        />
      </Stack>
      <StaffTable
        handleEdit={(v) => {
          setItemEdit(v)
          handleDialog(true)
        }}
      />
      {
        openDialog &&
        <StaffCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemEdit == null ? null : { ...itemEdit!.user, roleId: itemEdit!.role, administratorId: itemEdit.id }}
        />
      }
    </>
  )
}
