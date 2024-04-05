import { ComponentSearch, ComponentTablePagination } from "@/components";
import { useStaffStore, useAuthStore } from "@/hooks";
import { StaffModel, PermissionModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (administrator: StaffModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (administrator: StaffModel) => void;
  items?: any[];
}

export const StaffTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { staffs = [], getStaff, deleteStaff } = useStaffStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [userList, setUserList] = useState<StaffModel[]>([]);
  const [query, setQuery] = useState<string>('');
  const { roleUser } = useAuthStore();

  useEffect(() => {
    getStaff()
  }, []);

  useEffect(() => {
    const filtered = staffs.filter((e: StaffModel) =>
      e.user.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : staffs,
      page,
      rowsPerPage
    );
    setUserList(newList)
  }, [staffs, page, rowsPerPage, query])


  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Administrador"
        search={setQuery}
      />
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              {/* <TableCell sx={{ fontWeight: 'bold' }}>Carnet</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
              {/* <TableCell sx={{ fontWeight: 'bold' }}>Telefono</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold' }}>Rol</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((staff: StaffModel) => {
              const isSelected = items.includes(staff.id);
              return (
                <TableRow key={staff.id} >
                  {
                    stateSelect && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={() => itemSelect!(staff)}
                      />
                    </TableCell>
                  }
                  {/* <TableCell>{staff.user.identityCard}</TableCell> */}
                  <TableCell>{staff.user.name}</TableCell>
                  <TableCell>{staff.user.lastName}</TableCell>
                  {/* <TableCell>{staff.user.phone}</TableCell> */}
                  <TableCell>{staff.role.name}</TableCell>
                  {
                    !stateSelect && <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton
                          onClick={() => handleEdit!(staff)}
                          disabled={!roleUser.permissions.find((permission: PermissionModel) => permission.name === "editar administradores")}
                        >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteStaff(staff.id)}
                          disabled={!roleUser.permissions.find((permission: PermissionModel) => permission.name === "eliminar administradores")}
                        >
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  }
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={staffs.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
    </Stack>
  );
}