import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setEvents, setAddEvent, setUpdateEvent } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useEventStore = () => {
  const { events } = useSelector((state: any) => state.events);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getEvents = async () => {
    try {
      const { data } = await coffeApi.get('/event');
      console.log(data);
      dispatch(setEvents({ events: data.events }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const createEvent = async (body: object) => {
    try {
      const { data } = await coffeApi.post(`/event/`, body);
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
  return {
    //* Propiedades
    events,
    //* Métodos
    getEvents,
    createEvent,
    registerAttendanceEvent,
    updateEvent,
    deleteEvent,
  };
};
