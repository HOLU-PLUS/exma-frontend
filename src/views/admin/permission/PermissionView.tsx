import { Typography } from "@mui/material"
import { PermissionTable } from "."

export const PermissionView = () => {
  return (
    <>
    <Typography variant="h6">Permisos</Typography>
    <div style={{ height: 10 }} />
      <PermissionTable />
    </>
  )
}
