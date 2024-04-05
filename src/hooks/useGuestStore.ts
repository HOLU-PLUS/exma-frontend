import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setGuests, setAddGuest, setUpdateGuest, setDeleteGuest } from '@/store';
import Swal from 'sweetalert2';

export const useGuestStore = () => {
  const { guests } = useSelector((state: any) => state.guests);
  const dispatch = useDispatch();

  const getGuests = async () => {
    console.log('OBTENIENDO INVITADOS')
    const { data } = await coffeApi.get('/guest');
    console.log(data)
    dispatch(setGuests({ guests: data.guests }));
  }

  const createGuest = async (body: object) => {
    try {
      console.log('CREANDO INVITADO')
      console.log(body)
      const { data } = await coffeApi.post(`/guest`, body);
      console.log(data)
      dispatch(setAddGuest({ guest: data.guest }));
      Swal.fire('Invitado creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const updateGuest = async (id: number, body: object) => {
    try {
      console.log('MODIFICANDO INVITADO')
      const { data } = await coffeApi.put(`/guest/${id}`, body);
      console.log(data)
      dispatch(setUpdateGuest({ guest: data.guest }));
      Swal.fire('Se modifico el invitado', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const deleteGuest = async (id: number) => {
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
          console.log('ELIMINANDO PACIENTE')
          const { data } = await coffeApi.delete(`/guest/${id}`);
          console.log(data)
          dispatch(setDeleteGuest({ id }));
          Swal.fire(
            'Eliminado',
            'Invitado eliminado correctamente',
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
    guests,
    //* Métodos
    getGuests,
    createGuest,
    updateGuest,
    deleteGuest,
  }
}