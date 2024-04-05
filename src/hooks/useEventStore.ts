import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setEvents, setAddEvent, setUpdateEvent } from '@/store';
import Swal from 'sweetalert2';

export const useEventStore = () => {
  const { events } = useSelector((state: any) => state.events);
  const dispatch = useDispatch();

  const getEvents = async () => {
    console.log('OBTENIENDO EVENTOS')
    const { data } = await coffeApi.get('/event');
    console.log(data)
    dispatch(setEvents({ events: data.events }));
  }

  const createEvent = async (body: object) => {
    try {
      console.log('CREANDO UN EVENTO')
      console.log(body)
      const { data } = await coffeApi.post(`/event`, body);
      console.log(data)
      dispatch(setAddEvent({ treatment: data.treatment }));
      Swal.fire('Evento creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const updateEvent = async (id: number, body: object) => {
    try {
      console.log('MODIFICANDO EVENTO')
      const { data } = await coffeApi.put(`/event/${id}`, body);
      console.log(data)
      dispatch(setUpdateEvent({ patient: data.patient }));
      Swal.fire('Se modifico el tratamiento', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }
  const deleteEvent = async (id: number) => {
    try {
      Swal.fire({
        title: '¿Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, bórralo!',
        cancelButtonText: '¡No, cancelar!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          console.log('ELIMINANDO EVENTO')
          const { data } = await coffeApi.delete(`/event/${id}`);
          console.log(data)
          dispatch(setUpdateEvent({ patient: data.patient }));
          Swal.fire(
            'Eliminado',
            'Tratamiento eliminado correctamente',
            'success'
          )
        } else {
          Swal.fire(
            'Cancelado',
            'Usuario esta a salvo :)',
            'error'
          )
        }
      });
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.errors[0].msg, 'error');
    }
  }
  return {
    //* Propiedades
    events,
    //* Métodos
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  }
}