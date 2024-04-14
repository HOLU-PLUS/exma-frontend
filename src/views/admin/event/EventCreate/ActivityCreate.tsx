import { FormEvent, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { FormActivityModel, FormActivityValidations } from '@/models';
import { ComponentDate, ComponentInput } from '@/components';
import { useEventStore, useForm } from '@/hooks';

interface Props {
  id: number;
  handleNext: () => void;
  handleBack: () => void;
}

const formValidations: FormActivityValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  description: [(value: string) => value.length >= 1, 'Debe ingresar la descripción'],
  start: [(value: Date) => value != null, 'Debe ingresar la fecha inicio'],
  end: [(value: Date) => value != null, 'Debe ingresar la fecha fin'],
};

export const ActivityCreate = (props: Props) => {
  const { id, handleNext, handleBack } = props;
  const { event, InsertActivity, RemoveActivity } = useEventStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const {
    name,
    description,
    start,
    end,
    onInputChange,
    onValueChange,
    onListValuesChange,
    isFormValid,
    nameValid,
    descriptionValid,
    startValid,
    endValid,
  } = useForm(
    event.activities.find((e: FormActivityModel) => e.id == id),
    formValidations
  );
  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    const activity: FormActivityModel = {
      id: id,
      name,
      description,
      start,
      end,
    };
    InsertActivity(activity);
    handleNext();
  };

  return (
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
            minDate={event.start}
            maxDate={event.end}
            onChange={(start) => onListValuesChange(['start', 'end'], [start, null])}
            error={!!startValid && formSubmitted}
            helperText={formSubmitted ? startValid : ''}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: '5px' }}>
          <ComponentDate
            title="Fecha Fin"
            date={end}
            minDate={start || event.start}
            maxDate={event.end}
            onChange={(end) => onValueChange('end', end)}
            error={!!endValid && formSubmitted}
            helperText={formSubmitted ? endValid : ''}
          />
        </Grid>
      </Grid>
      <Box sx={{ mb: 2 }}>
        <div>
          <Button variant="contained" type="submit" sx={{ m: 1 }}>
            continuar
          </Button>
          <Button disabled={event.activities[0].id == id} onClick={handleBack} sx={{ m: 1 }}>
            Atrás
          </Button>
          <Button
            disabled={event.activities.length == 1}
            onClick={() => RemoveActivity(id)}
            sx={{ m: 1 }}
          >
            Eliminar
          </Button>
        </div>
      </Box>
    </form>
  );
};
