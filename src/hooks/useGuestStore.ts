import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setGuests, setDeleteGuest, setGuest } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useGuestStore = () => {
  const { guest, guests } = useSelector((state: any) => state.guests);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getGuests = async () => {
    try {
      const { data } = await coffeApi.get('/guest');
      console.log(data);
      dispatch(setGuests({ guests: data.guests }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const getGuest = async (codeQr:string) => {
    try {
      const { data } = await coffeApi.get(`/guest/${codeQr}`);
      console.log(data);
      dispatch(setGuest({ guest: data }));
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
    guest,
    guests,
    //* Métodos
    getGuests,
    getGuest,
    deleteGuest,
  };
};
