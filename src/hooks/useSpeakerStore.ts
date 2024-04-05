import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setSpeakers, setAddSpeaker, setUpdateSpeaker, setDeleteSpeaker } from '@/store';
import Swal from 'sweetalert2';

export const useSpeakerStore = () => {
  const { speakers } = useSelector((state: any) => state.speakers);
  const dispatch = useDispatch();

  const getSpeakers = async () => {
    console.log('OBTENIENDO PONENTES')
    const { data } = await coffeApi.get('/speaker');
    console.log(data)
    dispatch(setSpeakers({ speakers: data.speakers }));
  }

  const createSpeaker = async (body: object) => {
    try {
      console.log('CREANDO PONENTE')
      console.log(body)
      const { data } = await coffeApi.post(`/speaker`, body);
      console.log(data)
      dispatch(setAddSpeaker({ speaker: data.speaker }));
      Swal.fire('Ponente creado correctamente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const updateSpeaker = async (id: number, body: object) => {
    try {
      console.log('MODIFICANDO PONENTE')
      const { data } = await coffeApi.put(`/speaker/${id}`, body);
      console.log(data)
      dispatch(setUpdateSpeaker({ speaker: data.speaker }));
      Swal.fire('Se modifico el ponente', '', 'success');
    } catch (error: any) {
      Swal.fire('Oops ocurrio algo', error.response.data.msg, 'error');
    }
  }

  const deleteSpeaker = async (id: number) => {
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
          console.log('ELIMINANDO PONENTE')
          const { data } = await coffeApi.delete(`/speaker/${id}`);
          console.log(data)
          dispatch(setDeleteSpeaker({ id }));
          Swal.fire(
            'Eliminado',
            'Ponente eliminado correctamente',
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
    speakers,
    //* Métodos
    getSpeakers,
    createSpeaker,
    updateSpeaker,
    deleteSpeaker,
  }
}