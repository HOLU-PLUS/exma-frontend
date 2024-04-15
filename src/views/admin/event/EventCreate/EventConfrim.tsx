import { useEventStore } from '@/hooks';
import { ActivityModel } from '@/models';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import esES from 'date-fns/locale/es';
import { format } from 'date-fns';

export const EventConfrim = () => {
  const { event } = useEventStore();
  return (
    <>
      <Typography variant="h6">{event.name}</Typography>
      <Typography>{`Descripción: ${event.description}`}</Typography>
      <Typography>{`${format(new Date(event.start!), 'EEEE dd-MMMM-yyyy HH:mm', {
        locale: esES,
      })}`}</Typography>
      <Typography>{`${format(new Date(event.end!), 'EEEE dd-MMMM-yyyy HH:mm', {
        locale: esES,
      })}`}</Typography>

      <Typography>Actividades:</Typography>
      <TableContainer>
        <Table sx={{ minWidth: 350 }} size="small">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Inicio</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Fin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {event.activities.map((activity: ActivityModel) => {
              return (
                <TableRow key={activity.id}>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.description}</TableCell>
                  <TableCell>{`${format(new Date(activity.start!), 'EEEE dd-MMMM-yyyy HH:mm', {
                    locale: esES,
                  })}`}</TableCell>
                  <TableCell>{`${format(new Date(activity.end!), 'EEEE dd-MMMM-yyyy HH:mm', {
                    locale: esES,
                  })}`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
