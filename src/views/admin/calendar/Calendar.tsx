import { getMessagesES, localizer } from "@/helpers";

import { useEventStore } from "@/hooks";
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './styles.css';
import { Paper } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { EventModel } from "@/models";
import { CalendarEvent, EventDialog } from ".";


interface calendarProps {
  screenHeight: number;
}
export const CalendarComponent = (props: calendarProps) => {
  const {
    screenHeight,
  } = props;
  const [itemSelect, setitemSelect] = useState<EventModel>()
  const [openDialog, setopenDialog] = useState(false);
  const { events = [], getEvents } = useEventStore()


  useEffect(() => {
    getEvents();
  }, [])
  const onSelect = (event: EventModel) => {
    setitemSelect(event)
    handleDialog(true);
  }
  const handleDialog = useCallback((value: boolean) => {
    setopenDialog(value);
  }, []);
  // .filter((treatment: TreatmentModel) => treatment.state)
  return (
    <>
      <Paper sx={{ p: .5, borderRadius: '10px' }}>
        <Calendar
          culture='es'
          localizer={localizer}
          events={[...events.map(((event: EventModel) =>
          ({
            title: event.name,
            ...event
          })))
          ]}
          style={{ height: `${screenHeight - 150}px`, cursor: 'pointer' }}
          messages={getMessagesES()}
          eventPropGetter={() => {
            return {
              style: {
                backgroundColor: '#a7e8d8',
                color: '#000',
                opacity: 0.6,
                display: 'block',
                fontSize: '0.9rem'
              },
            };
          }}
          components={{
            event: CalendarEvent
          }}
          onSelectEvent={onSelect}
        />
      </Paper>
      {
        itemSelect &&
        <EventDialog
          open={openDialog}
          handleClose={() => handleDialog(false)}
          event={itemSelect}
        />
      }
    </>
  )
}
