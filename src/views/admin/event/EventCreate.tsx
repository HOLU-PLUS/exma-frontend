import { ComponentDate, ComponentInput } from "@/components"
import { useForm, useEventStore } from "@/hooks";
import { FormEventValidations, FormEventModel, ActivityModel } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useState } from "react";
interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const formFields: FormEventModel = {
  name: '',
  description: '',
  price: 0,
  start: null,
  end: null,
  activities: [],
}

const formValidations: FormEventValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  description: [(value: string) => value.length >= 1, 'Debe ingresar la descripción'],
  price: [(value: number) => value!= null , 'Debe ingresar el nombre'],
  start: [(value: Date) => value != null, 'Debe ingresar la fecha inicio'],
  end: [(value: Date) => value != null, 'Debe ingresar la fecha fin'],
  activities: [(value: ActivityModel[]) => value != null, 'Debe ingresar una actividad'],
}

export const EventCreate = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { createEvent, updateEvent } = useEventStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    name, description, price, start, end,
    onInputChange, isFormValid, onResetForm, onValueChange,
    nameValid, descriptionValid, priceValid,startValid,endValid
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(item)
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      createEvent(
        {
          name: name.trim(),
          description: description.trim(),
          price: parseInt(price),
          start,
          end,
          activities:[] ,
        });
    } else {
      updateEvent(item.treatmentId,
        {
          name: name.trim(),
          description: description.trim(),
          price,
          start,
          end,
          activities:[] ,
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Evento' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              onResetForm();
              handleClose()
            }}>Cancelar</Button>
            <Button type="submit">
              {item == null ? 'CREAR' : 'EDITAR'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  )
}
