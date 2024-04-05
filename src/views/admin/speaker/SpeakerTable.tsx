import { ComponentSearch, ComponentTablePagination, ShowTable } from "@/components";
import { useSpeakerStore } from "@/hooks";
import { StaffModel, SpeakerModel, ThethModel } from "@/models";
import { applyPagination } from "@/utils/applyPagination";
import { DeleteOutline, EditOutlined, KeyboardArrowDownOutlined, KeyboardArrowUpOutlined } from "@mui/icons-material";
import { Checkbox, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useCallback } from "react";
import { useEffect, useState } from "react";

interface tableProps {
  handleEdit?: (speaker: SpeakerModel) => void;
  limitInit?: number;
  stateSelect?: boolean;
  itemSelect?: (speaker: SpeakerModel) => void;
  items?: any[];
}

export const SpeakerTable = (props: tableProps) => {
  const {
    stateSelect = false,
    handleEdit,
    itemSelect,
    limitInit = 10,
    items = [],
  } = props;

  const { speakers = [], getSpeakers, deleteSpeaker } = useSpeakerStore();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(limitInit);
  const [patientList, setPatientList] = useState<SpeakerModel[]>([]);
  const [query, setQuery] = useState<string>('');

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [opendrawer, setOpendrawer] = useState<any>({ state: false, items: [] });

  useEffect(() => {
    getSpeakers()
  }, []);

  useEffect(() => {
    const filtered = speakers.filter((e: StaffModel) =>
      e.user.name.toLowerCase().includes(query.toLowerCase())
    );
    const newList = applyPagination(
      query != '' ? filtered : speakers,
      page,
      rowsPerPage
    );
    setPatientList(newList)
  }, [speakers, page, rowsPerPage, query])

  const handleTheths = useCallback((state: boolean, items: ThethModel[]) => {
    setOpendrawer({ state, items })
  }, []);

  return (
    <Stack sx={{ paddingRight: '10px' }}>
      <ComponentSearch
        title="Buscar Ponente"
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
            {patientList.map((speaker: SpeakerModel) => {
              const isSelected = items.includes(speaker.id);
              return (
                <React.Fragment key={speaker.id} >
                  <TableRow >
                    {
                      stateSelect && <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={() => itemSelect!(speaker)}
                        />
                      </TableCell>
                    }
                    <TableCell>{speaker.user.name}</TableCell>
                    <TableCell>{speaker.user.lastName}</TableCell>
                    {/* <TableCell>{guest.user.phone}</TableCell> */}
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenIndex(openIndex == speaker.id ? null : speaker.id)}
                      >
                        {openIndex == speaker.id ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
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
                            onClick={() => handleEdit!(speaker)}
                          >
                            <EditOutlined color="info" />
                          </IconButton>
                          <IconButton
                            onClick={() => deleteSpeaker(speaker.id)}
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
        total={speakers.length}
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
