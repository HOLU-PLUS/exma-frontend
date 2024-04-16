import Swal from 'sweetalert2';

export const useAlertStore = () => {
  const showSuccess = (message: string) => {
    Swal.fire(message,'', 'success');
  };

  const showWarning = () => {
    return Swal.fire({
      title: '¿Estas seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: '¡No, cancelar!',
    });
  };

  const showError = (title: string, message: string) => {
    Swal.fire(title, message, 'error');
  };

  const showInput = async (title:string) => {
    const { value: text } = await Swal.fire({
      title,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0B815A',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#F04438',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      input: "textarea",
      inputPlaceholder: "Escribe el código",
      inputValidator: (value) => {
        if (!value) {
          return "Es necesario agregar el código";
        }
      },
      customClass: {
        input: 'custom-textarea',
      }
    });
    return text;
  }
  return {
    showSuccess,
    showWarning,
    showError,
    showInput,
  };
};
