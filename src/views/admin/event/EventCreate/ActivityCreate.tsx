import { FormEvent, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FormActivityModel, FormActivityValidations } from '@/models';
import { ComponentDate, ComponentInput } from '@/components';
import { useForm } from '@/hooks';

interface createProps {
  handleNext: () => void;
  handleBack?: () => void;
  disabledBtnBack?: boolean;
}

const formFields: FormActivityModel = {
  name: 'act',
  description: 'desc',
  start: new Date(),
  end: new Date(),
};

const formValidations: FormActivityValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  description: [(value: string) => value.length >= 1, 'Debe ingresar la descripción'],
  start: [(value: Date) => value != null, 'Debe ingresar la fecha inicio'],
  end: [(value: Date) => value != null, 'Debe ingresar la fecha fin'],
};

export const ActivityCreate = (props: createProps) => {
  const { handleNext, handleBack, disabledBtnBack = false } = props;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { name, description, start, end, onInputChange, onValueChange, isFormValid, nameValid, descriptionValid, startValid, endValid } = useForm(
    formFields,
    formValidations
  );
  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    handleNext();
  };

  return (
    <>
      <form onSubmit={sendSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Nombre"
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={formSubmitted ? nameValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentInput
              type="text"
              label="Descripción"
              name="description"
              value={description}
              onChange={onInputChange}
              error={!!descriptionValid && formSubmitted}
              helperText={formSubmitted ? descriptionValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentDate
              title="Fecha Inicio"
              date={start}
              onChange={(start) => onValueChange('start', start)}
              error={!!startValid && formSubmitted}
              helperText={formSubmitted ? startValid : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
            <ComponentDate
              title="Fecha Fin"
              date={end}
              onChange={(end) => onValueChange('end', end)}
              error={!!endValid && formSubmitted}
              helperText={formSubmitted ? endValid : ''}
            />
          </Grid>
        </Grid>
        <Box sx={{ mb: 2 }}>
          <div>
            <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
              continuar
              {/* {index === activities.length - 1 ? 'Finish' : 'Continue'} */}
            </Button>
            <Button disabled={disabledBtnBack} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
          </div>
        </Box>
      </form>
    </>
  );
};
