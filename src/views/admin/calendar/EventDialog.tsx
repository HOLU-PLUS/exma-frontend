import { ComponentButton } from '@/components';
import { useEventStore } from '@/hooks';
import { AttendanceModel } from '@/models';
import { SpatialTracking } from '@mui/icons-material';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useEffect, useState } from 'react';
import { RegisterAttendance } from '.';

interface dialogProps {
  open: boolean;
  handleClose: () => void;
}
export const EventDialog = (props: dialogProps) => {
  const { open, handleClose } = props;
  const { event, attendances, getGuestByEvent } = useEventStore();
  const [modal, setModal] = useState(false);

  const { registerAttendanceEvent } = useEventStore();
  const sendSubmit = (result: string) => {
    registerAttendanceEvent({
      eventId: event.id,
      qrGuest: result,
    });
    handleClose();
  };

  useEffect(() => {
    getGuestByEvent();
  }, []);

  return (
    <>
      {modal && (
        <RegisterAttendance
          opendrawer={modal}
          handleDrawer={() => setModal(false)}
          sendSubmit={sendSubmit}
        />
      )}
      <Dialog maxWidth="xl" open={open} onClose={handleClose}>
        {event && (
          <DialogContent>
            <DialogTitle>{event.name}</DialogTitle>
            <Typography>{event.description}</Typography>
            <Typography>Asistencias:</Typography>
            <TableContainer>
              <Table sx={{ minWidth: 350 }} size="small">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendances.map((attendance: AttendanceModel) => {
                    return (
                      <TableRow key={attendance.id}>
                        <TableCell>{attendance.name}</TableCell>
                        {/* <TableCell>{attendance.description}</TableCell> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <ComponentButton
              text="Registrar asistencia"
              onClick={() => setModal(true)}
              startIcon={
                <SvgIcon fontSize="small">
                  <SpatialTracking />
                </SvgIcon>
              }
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
};
