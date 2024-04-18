import { getMessagesES, localizer } from '@/helpers';
import { useavailabilityStore } from '@/hooks';
import { AvailabilityModel } from '@/models';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { IconButton, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { Calendar, Views } from 'react-big-calendar';

interface Props {
  codeQr: string;
  onPress: (availability: AvailabilityModel) => void;
}

export const CalendarDiary = (props: Props) => {
  const { codeQr, onPress } = props;

  const { availabilities, getAvailabilitiesByGuest } = useavailabilityStore();
  useEffect(() => {
    getAvailabilitiesByGuest(codeQr);
  }, []);

  return (
    <Paper sx={{ p: 0.5, borderRadius: '10px' }}>
      <Calendar
        culture="es"
        localizer={localizer}
        events={[
          ...availabilities.map((event: AvailabilityModel) => ({
            // title:'asd',
            ...event,
          })),
        ]}
        style={{ height: `47vh`, cursor: 'pointer' }}
        messages={getMessagesES()}
        defaultView={Views.AGENDA}
        views={['agenda']}
        components={{
          agenda: {
            event: MyAgendaEvent,
          },
        }}
        onSelectEvent={(availability) => onPress(availability)}
      />
    </Paper>
  );
};

export const MyAgendaEvent = ({ event }: any) => {
  const { title } = event;
  const { deleteAvailability } = useavailabilityStore();
  return (
    <div>
      {title}
      <Stack alignItems="center" direction="row" spacing={2}>
        <IconButton onClick={() => {}}>
          <EditOutlined color="info" />
        </IconButton>
        <IconButton onClick={() => deleteAvailability(event)}>
          <DeleteOutline color="error" />
        </IconButton>
      </Stack>
    </div>
  );
};
