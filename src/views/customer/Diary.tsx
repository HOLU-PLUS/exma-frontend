import { getMessagesES, localizer } from '@/helpers';
import { Paper } from '@mui/material';
import { Calendar, Views } from 'react-big-calendar';

export const Diary = () => {
  return (
    <>
      <Paper sx={{ p: 0.5, borderRadius: '10px' }}>
        <Calendar
          culture="es"
          localizer={localizer}
          // events={[
          //   ...events.map((event: EventModel) => ({
          //     title: event.name,
          //     ...event,
          //   })),
          // ]}
          style={{ height: `92vh`, cursor: 'pointer' }}
          messages={getMessagesES()}
          eventPropGetter={() => {
            return {
              style: {
                backgroundColor: '#a7e8d8',
                color: '#000',
                opacity: 0.6,
                display: 'block',
                fontSize: '0.9rem',
              },
            };
          }}
          view={Views.AGENDA}
          views={['agenda']}
          components={{
            event: CalendarEvent,
          }}
          // onSelectEvent={(event) => {
          //   resetEvent(event);
          //   setopenDialog(true);
          // }}
        />
      </Paper>
    </>
  );
};


export const CalendarEvent = ({ event }: any) => {

  const { title } = event;

  return (
    <>
      <strong>{title}</strong>
    </>
  )
}