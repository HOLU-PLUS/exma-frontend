import { ComponentDate } from '@/components';
import { useForm } from '@/hooks';
import { AvailabilityModel, FormAvailabilityModel, FormAvailabilityValidations } from '@/models';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { FormEvent, useState } from 'react';

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: AvailabilityModel | null;
}

const formFields: FormAvailabilityModel = {
  start: null,
  end: null,
};

const formValidations: FormAvailabilityValidations = {
  start: [(value: Date) => value != null, 'Debe ingresar el nombre'],
  end: [(value: Date) => value != null, 'Debe ingresar el nombre'],
};

export const CreateDiary = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {
    start,
    end,
    isFormValid,
    onListValuesChange,
    onValueChange,
    onResetForm,
    startValid,
    endValid,
  } = useForm(item ?? formFields, formValidations);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sendSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    // if (item == null) {
    //   await postCreateRole({
    //     name: name.trim(),
    //     permissions: permissions.map((e: PermissionModel) => e.id),
    //   });
    // } else {
    //   await putUpdateRole(item.id, {
    //     name: name.trim(),
    //     permissions: permissions.map((e: PermissionModel) => e.id),
    //   });
    // }
    handleClose();
    onResetForm();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {item == null ? 'Nueva Disponibilidad' : `${item.start.toString()}`}
      </DialogTitle>
      <form onSubmit={sendSubmit}>
        <DialogContent sx={{ display: 'flex' }}>
          <Grid container>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentDate
                title="Fecha Inicio"
                date={start}
                minDate={new Date()}
                onChange={(start) => onListValuesChange(['start', 'end'], [start, null])}
                error={!!startValid && formSubmitted}
                helperText={formSubmitted ? startValid : ''}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
              <ComponentDate
                title="Fecha Fin"
                date={end}
                minDate={start ?? new Date()}
                onChange={(end) => onValueChange('end', end)}
                error={!!endValid && formSubmitted}
                helperText={formSubmitted ? endValid : ''}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              // onResetForm();
              // handleClose();
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">{item == null ? 'CREAR' : 'EDITAR'}</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
