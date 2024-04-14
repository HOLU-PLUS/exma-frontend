import { ComponentDate, ComponentInput } from '@/components';
import { useEventStore, useForm } from '@/hooks';
import { FormEventModel, FormEventValidations, EventModel } from '@/models';
import { Grid } from '@mui/material';
import { forwardRef, useImperativeHandle, useState } from 'react';

const formFields: FormEventModel = {
  name: '',
  description: '',
  price: 0,
  start: null,
  end: null,
  activities: [],
};

const formValidations: FormEventValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  description: [(value: string) => value.length >= 1, 'Debe ingresar la descripción'],
  price: [(value: number) => value != null, 'Debe ingresar el nombre'],
  start: [(value: Date) => value != null, 'Debe ingresar la fecha inicio'],
  end: [(value: Date) => value != null, 'Debe ingresar la fecha fin'],
};

export const EventCreate = forwardRef((_, ref) => {
  useImperativeHandle(ref, () => ({
    validate: () => sendSubmit(),
  }));

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { event, InsertEvent } = useEventStore();
  const {
    name,
    description,
    price,
    start,
    end,
    onInputChange,
    onValueChange,
    onListValuesChange,
    isFormValid,
    // onResetForm,
    nameValid,
    descriptionValid,
    priceValid,
    startValid,
    endValid,
  } = useForm(event ?? formFields, formValidations);

  const sendSubmit = () => {
    setFormSubmitted(true);
    if (!isFormValid) return false;
    const event: EventModel = {
      name,
      description,
      price,
      start,
      end,
      activities: [
        {
          id: 0,
          name: '',
          description: '',
          start: null,
          end: null,
        }
      ],
    };
    InsertEvent(event);
    return true;
  };
  return (
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
      <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
        <ComponentDate
          title="Fecha Inicio"
          date={start}
          minDate={new Date()}
          onChange={(start) => onListValuesChange(['start', 'end'], [start, null])}
          error={!!startValid && formSubmitted}
          helperText={formSubmitted ? startValid : ''}
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
        <ComponentDate
          title="Fecha Fin"
          date={end}
          minDate={start ?? new Date()}
          onChange={(end) => onValueChange('end', end)}
          error={!!endValid && formSubmitted}
          helperText={formSubmitted ? endValid : ''}
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
        <ComponentInput
          type="text"
          label="Precio del evento"
          name="price"
          value={price}
          onChange={onInputChange}
          error={!!priceValid && formSubmitted}
          helperText={formSubmitted ? priceValid : ''}
        />
      </Grid>
    </Grid>
  );
});
