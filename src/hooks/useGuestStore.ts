import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setGuests, setDeleteGuest } from '@/store';
import Swal from 'sweetalert2';
import { onLoginCustomer } from "@/store";

export const useGuestStore = () => {
  const { guests } = useSelector((state: any) => state.guests);
  const dispatch = useDispatch();

  const logInGuest = async (body: object) => {
    const { data } = await coffeApi.post('/auth/guest/', body);
    console.log(data);
    const user = `${data.user.name} ${data.user.lastName}`;
    const qr = data.user.guests.codeQr;
    localStorage.setItem('tokenCustomer', data.token);
    localStorage.setItem('user', user);
    localStorage.setItem('qr', qr);
    dispatch(onLoginCustomer(user));

  }

  const registerGuest = async (body: object) => {
    try {
      console.log('CREANDO UN INVITADO');
      const { data } = await coffeApi.post('/guest/', body);
      console.log(data);
      Swal.fire('Invitado creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const getGuests = async () => {
    try {
      console.log('OBTENIENDO INVITADOS')
      const { data } = await coffeApi.get('/guest');
      console.log(data)
      dispatch(setGuests({ guests: data.guests }));
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
    logInGuest,
    registerGuest,
    getGuests,
    deleteGuest,
  }
}