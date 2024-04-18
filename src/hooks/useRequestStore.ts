import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setAddRequest, setDeleteRequest, setRequests, setUpdateRequest } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useRequestStore = () => {
  const { requests } = useSelector((state: any) => state.requests);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getRequestsByGuest = async () => {
    try {
      const { data } = await coffeApi.get('/request');
      console.log(data);
      dispatch(setRequests({ requests: data.requests }));
    } catch (error) {
      throw handleError(error);
    }
  };

  const postCreateRequest = async (body: object) => {
    try {
      const { data } = await coffeApi.post(`/request`, body);
      dispatch(setAddRequest({ request: data }));
      showSuccess('Solicitud creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const putUpdateRequest = async (id: number, body: object) => {
    try {
      console.log(body);
      const { data } = await coffeApi.put(`/request/${id}`, body);
      dispatch(setUpdateRequest({ request: data }));
      showSuccess('Solicitud editado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  };

  const deleteRequest = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/request/${id}`);
        dispatch(setDeleteRequest({ id }));
        showSuccess('Solicitud eliminado correctamente');
      } else {
        showError('Cancelado', 'El rol esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  };

  return {
    //* Propiedades
    requests,
    //* Métodos
    getRequestsByGuest,
    postCreateRequest,
    putUpdateRequest,
    deleteRequest,
  };
};
