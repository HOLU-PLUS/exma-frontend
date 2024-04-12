import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setGuests, setDeleteGuest } from '@/store';
import { onLoginCustomer } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useGuestStore = () => {
  const { guests } = useSelector((state: any) => state.guests);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const logInGuest = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/auth/guest/', body);
      console.log(data);
      const user = `${data.user.name} ${data.user.lastName}`;
      const qr = data.user.guests.codeQr;
      localStorage.setItem('tokenCustomer', data.token);
      localStorage.setItem('user', user);
      localStorage.setItem('qr', qr);
      dispatch(onLoginCustomer(user));
    } catch (error) {
      throw handleError(error);
    }
  };

  const registerGuest = async (body: object) => {
    try {
      const { data } = await coffeApi.post('/guest/', body);
      console.log(data);
      showSuccess('Invitado creado correctamente');
    } catch (error: any) {
      throw handleError(error);
    }
  };

  const getGuests = async () => {
    try {
      const { data } = await coffeApi.get('/guest');
      console.log(data);
      dispatch(setGuests({ guests: data.guests }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const deleteGuest = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/guest/${id}`);
        dispatch(setDeleteGuest({ id }));
        showSuccess('Invitado eliminado correctamente');
      } else {
        showError('Cancelado', 'El invitado esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };
  return {
    //* Propiedades
    guests,
    //* Métodos
    logInGuest,
    registerGuest,
    getGuests,
    deleteGuest,
  };
};
