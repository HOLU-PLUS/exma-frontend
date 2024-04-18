import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import {
  setAvailabilities,
  setAddAvailability,
  setUpdateAvailability,
  setDeleteAvailability,
} from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useavailabilityStore = () => {
  const { availabilities } = useSelector((state: any) => state.availabilities);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getAvailabilitiesByGuest = async (codeQr:string) => {
    try {
      const { data } = await coffeApi.get(`/availability/guest/${codeQr}`);
      console.log(data);
      dispatch(setAvailabilities({ availabilities: data.availabilities }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const createAvailability = async (body: object) => {
    try {
      const { data } = await coffeApi.post(`/availability`, body);
      console.log(data);
      dispatch(setAddAvailability({ availability: data }));
      showSuccess('Disponibilidad creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const updateAvailability = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/availability/${id}`, body);
      console.log(data);
      dispatch(setUpdateAvailability({ availability: data }));
      showSuccess('Disponibilidad modificado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const deleteAvailability = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/availability/${id}`);
        dispatch(setDeleteAvailability({ id }));
        showSuccess('Disponibilidad eliminado correctamente');
      } else {
        showError('Cancelado', 'La disponibilidad esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };
  return {
    //* Propiedades
    availabilities,
    //* Métodos
    getAvailabilitiesByGuest,
    createAvailability,
    updateAvailability,
    deleteAvailability,
  };
};
