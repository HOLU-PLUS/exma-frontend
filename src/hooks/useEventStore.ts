import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setEvents, setAddEvent, setUpdateEvent, setEvent, setAddActivity, setRemoveActivity, setResetEvent, setAttendances } from '@/store';
import { useAlertStore, useErrorStore } from '.';
import { EventModel, FormActivityModel } from '@/models';

export const useEventStore = () => {
  const { event, events } = useSelector((state: any) => state.events);
  const {attendances} = useSelector((state:any)=> state.attendances);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  //* events
  const getEvents = async () => {
    try {
      const { data } = await coffeApi.get('/event');
      console.log(data);
      dispatch(setEvents({ events: data.events }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const getGuestByEvent = async () => {
    try {
      const { data } = await coffeApi.get(`/event/all-guest/${event.id}`);
      console.log(data);
      dispatch(setAttendances({attendances:data.attendances}));
    } catch (error) {
      throw handleError(error);
    }
  };

  const createEvent = async () => {
    try {
      const { data } = await coffeApi.post(`/event/`, {
        ...event,
        activities: event.activities.map(({ id, ...rest }:FormActivityModel) => rest)
      });
      console.log(data);
      dispatch(setAddEvent({ event: data }));
      showSuccess('Evento creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const registerAttendanceEvent = async (body: object) => {
    try {
      const { data } = await coffeApi.post(`/event/attendance/`, body);
      console.log(data);
      dispatch(setAddEvent({ event: data }));
      showSuccess('Invitado registrado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const updateEvent = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/event/${id}`, body);
      console.log(data);
      dispatch(setUpdateEvent({ patient: data.patient }));
      showSuccess('Evento modificado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };
  const deleteEvent = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/event/${id}`);
        dispatch(setUpdateEvent({ id }));
        showSuccess('Evento eliminado correctamente');
      } else {
        showError('Cancelado', 'El evento esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  //*event
  const resetEvent = (event: EventModel|null) => {
    dispatch(setResetEvent({event:event}));
  }
  const InsertEvent = (event: EventModel) => {
    try {
      dispatch(setEvent({ event }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const InsertActivity = (activity: FormActivityModel) => {
    try {
      dispatch(setAddActivity({ activity }));
    } catch (error) {
      throw handleError(error);
    }
  };
  const RemoveActivity =(id:number)=> {
    try {
      dispatch(setRemoveActivity({id}))
    } catch (error) {
      throw handleError(error);
    }
  }
  return {
    //* Propiedades
    event,
    events,
    attendances,
    //* Métodos eventos
    getEvents,
    getGuestByEvent,
    createEvent,
    registerAttendanceEvent,
    updateEvent,
    deleteEvent,
    //* Métodos evento
    resetEvent,
    InsertEvent,
    InsertActivity,
    RemoveActivity,
  };
};
