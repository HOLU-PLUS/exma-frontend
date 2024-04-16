import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setSpeakers, setAddSpeaker, setUpdateSpeaker, setDeleteSpeaker } from '@/store';
import { useAlertStore, useErrorStore } from '.';

export const useSpeakerStore = () => {
  const { speakers } = useSelector((state: any) => state.speakers);
  const dispatch = useDispatch();
  const { handleError } = useErrorStore();
  const { showSuccess, showWarning, showError } = useAlertStore();

  const getSpeakers = async () => {
    try {
      const { data } = await coffeApi.get('/speaker');
      console.log(data)
      dispatch(setSpeakers({ speakers: data.speakers }));
    } catch (error) {
      throw handleError(error);
    }
  }

  const createSpeaker = async (body: object) => {
    try {
      const { data } = await coffeApi.post(`/speaker`, body);
      console.log(data)
      dispatch(setAddSpeaker({ speaker: data }));
      showSuccess('Ponente creado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  }

  const updateSpeaker = async (id: number, body: object) => {
    try {
      const { data } = await coffeApi.put(`/speaker/${id}`, body);
      console.log(data)
      dispatch(setUpdateSpeaker({ speaker: data }));
      showSuccess('Ponente modificado correctamente');
    } catch (error) {
      throw handleError(error);
    }
  }

  const deleteSpeaker = async (id: number) => {
    try {
      const result = await showWarning();
      if (result.isConfirmed) {
        await coffeApi.delete(`/speaker/${id}`);
        dispatch(setDeleteSpeaker({ id }));
        showSuccess('Ponente eliminado correctamente');
      } else {
        showError('Cancelado', 'El ponente esta a salvo :)');
      }
    } catch (error) {
      throw handleError(error);
    }
  }
  return {
    //* Propiedades
    speakers,
    //* Métodos
    getSpeakers,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
  }
}