import { ComponentDate, ComponentInput } from '@/components';
import { Grid } from '@mui/material';

interface createProps {
  values: any;
  formSubmitted: boolean;
}

export const EventCreate = (props: createProps) => {
  const { values, formSubmitted } = props;
  const {
    name,
    description,
    price,
    start,
    end,
    onInputChange,
    onValueChange,
    nameValid,
    descriptionValid,
    priceValid,
    startValid,
    endValid,
  } = values;
  return (
    <>
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
            onChange={(start) => onValueChange('start', start)}
            error={!!startValid && formSubmitted}
            helperText={formSubmitted ? startValid : ''}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
          <ComponentDate
            title="Fecha Fin"
            date={end}
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
      {/* <DialogActions>
          <Button
            onClick={() => {
              onResetForm();
              handleClose();
            }}
          >
            Cancelar
          </Button>
          <Button type="submit">{item == null ? 'CREAR' : 'EDITAR'}</Button>
        </DialogActions> */}
    </>
  );
};
