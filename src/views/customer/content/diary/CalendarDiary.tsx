
import { getMessagesES, localizer } from '@/helpers';
import { useavailabilityStore } from '@/hooks';
import { AvailabilityModel } from '@/models';
import { Paper } from '@mui/material';
import { useEffect } from 'react';
import { Calendar, Views } from 'react-big-calendar';

interface Props {
  codeQr: string;
}
export const CalendarDiary = (props:Props) => {
  const { codeQr } = props;

  const {availabilities,getAvailabilitiesByGuest} = useavailabilityStore();
  useEffect(() => {
    getAvailabilitiesByGuest(codeQr)
  }, [])
  
  return (
    <Paper sx={{ p: 0.5, borderRadius: '10px' }}>
    <Calendar
      culture="es"
      localizer={localizer}
      events={[
        ...availabilities.map((event: AvailabilityModel) => ({
          ...event,
        })),
      ]}
      style={{ height: `47vh`, cursor: 'pointer' }}
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
  )
}


export const CalendarEvent = ({ event }: any) => {

  const { title } = event;

  return (
    <>
      <strong>{title}</strong>
    </>
  )
}