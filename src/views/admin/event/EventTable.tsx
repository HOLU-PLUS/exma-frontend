import { GuestModel, ThethModel, EventModel } from "@/models";
import { Collapse, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import esES from 'date-fns/locale/es';
import { format } from "date-fns";
import { DeleteOutline, EditOutlined } from "@mui/icons-material";
import { useEventStore } from "@/hooks";
import { useCallback, useState } from "react";
import { EventCreate } from ".";

interface tableProps {
  patient: GuestModel;
  open: boolean;
  events: EventModel[];
  onViewTheths?: (values: ThethModel[]) => void;
}

export const EventTable = (props: tableProps) => {
  const {
    patient,
    open,
    events,
    onViewTheths,
  } = props;
  const { deleteEvent } = useEventStore();
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const [openDialog, setopenDialog] = useState(false);
  const [itemEdit, setItemEdit] = useState<EventModel>();
  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value);
  }, []);

  return (
    <>
      <TableRow style={{ backgroundColor: open ? '#E2F6F0' : '#f2f2f2' }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" >
            <Typography variant="h6">Eventos</Typography>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Fecha</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Monto total</TableCell>
                  {/* <TableCell sx={{ fontWeight: 'bold' }}>Etapa</TableCell> */}
                  {/* <TableCell sx={{ fontWeight: 'bold' }}>Dientes</TableCell> */}
                  {/* <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell> */}
                  <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{`${format(new Date(event.start), 'EEEE dd-MMMM-yyyy HH:mm', { locale: esES })}`}</TableCell>
                    <TableCell>{event.price}</TableCell>
                    {/* <TableCell>{treatment.stageType.name}</TableCell> */}
                    {/* <TableCell>
                      <IconButton
                        onClick={() => onViewTheths!(treatment.thethIds)}
                      >
                        <RemoveRedEyeOutlined color="info" />
                      </IconButton>
                    </TableCell> */}
                    {/* <TableCell>
                      <SeverityPill color={treatment.state !== "cancelado" ? 'success' : 'error'}>
                        {treatment.state}
                      </SeverityPill>
                    </TableCell> */}
                    <TableCell align="right">
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <IconButton
                          onClick={() => {
                            setItemEdit(event)
                            handleDialog(true)
                          }}
                        >
                          <EditOutlined color="info" />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteEvent(event.id)}
                        >
                          <DeleteOutline color="error" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* {
        openDialog &&
        <EventCreate
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={{ ...itemEdit, stageTypeId: itemEdit!.stageType, patientId: patient, treatmentId: itemEdit!.id }}
        />
      } */}
    </>
  )
}
