import { ComponentSearch, ComponentTablePagination, ShowTable } from "@/components";
import { useGuestStore } from "@/hooks";
import { StaffModel, GuestModel, ThethModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (patient: GuestModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (patient: GuestModel) => void;
  items?: any[];
}

export const GuestTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { guests = [], getGuests, deleteGuest } = useGuestStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [patientList, setPatientList] = useState<GuestModel[]>([]);
  const [query, setQuery] = useState<string>('');

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [opendrawer, setOpendrawer] = useState<any>({ state: false, items: [] });
  
  useEffect(() => {
    getGuests()
  }, []);

  useEffect(() => {
    const filtered = guests.filter((e: StaffModel) =>
      e.user.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : guests,
      page,
      rowsPerPage
    );
    setPatientList(newList)
  }, [guests, page, rowsPerPage, query])

  const handleTheths = useCallback((state: boolean, items: ThethModel[]) => {
    setOpendrawer({ state, items })
  }, []);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Invitado"
        search={setQuery}
      />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
              {/* <TableCell sx={{ fontWeight: 'bold' }}>Telefono</TableCell> */}
              <TableCell sx={{ fontWeight: 'bold' }}>Historial Medico</TableCell>
              {!stateSelect && <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {patientList.map((guest: GuestModel) => {
              const isSelected = items.includes(guest.id);
              return (
                <React.Fragment key={guest.id} >
                  <TableRow >
                    {
                      stateSelect && <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => itemSelect!(guest)}
                        />
                      </TableCell>
                    }
                    <TableCell>{guest.user.name}</TableCell>
                    <TableCell>{guest.user.lastName}</TableCell>
                    {/* <TableCell>{guest.user.phone}</TableCell> */}
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenIndex(openIndex == guest.id ? null : guest.id)}
                      >
                        {openIndex == guest.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
                      </IconButton>
                    </TableCell>
                    {
                      !stateSelect && <TableCell align="right">
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          <IconButton
                            onClick={() => handleEdit!(guest)}
                          >
                            <EditOutlined color="info" />
                          </IconButton>
                          <IconButton
                            onClick={() => deleteGuest(guest.id)}
                          >
                            <DeleteOutline color="error" />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    }
                  </TableRow>
                  {/* <TreatmentTable
                    patient={guest}
                    open={openIndex == guest.id}
                    treatments={guest.treatmentsIds}
                    onViewTheths={(items) => handleTheths(true, items)}
                  /> */}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <ComponentTablePagination
        total={guests.length}
        onPageChange={(value) => setPage(value)}
        onRowsPerPageChange={(value) => setRowsPerPage(value)}
        page={page}
        limit={rowsPerPage}
      />
      {
        <ShowTable
          open={opendrawer.state}
          handleClose={() => handleTheths(false, [])}
          title="Dientes"
          headers={['#', 'Nombre', 'Modulo']}
          data={opendrawer.items}
        />
      }
    </Stack >
  );
}
