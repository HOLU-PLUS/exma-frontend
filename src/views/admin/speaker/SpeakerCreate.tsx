import { ComponentDate, ComponentInput } from "@/components"
import { useForm,  useSpeakerStore } from "@/hooks";
import { FormGuestModel, FormGuestValidations } from "@/models";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material"
import { FormEvent, useState } from "react";

interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const formFields: FormGuestModel = {
  identityCard: 0,
  name: '',
  lastName: '',
  phone: 0,
  birthDate: null,
  gender: '',
  allergies: '',
  bloodType: '',
}

const formValidations: FormGuestValidations = {
  identityCard: [(value: number) => value != 0, 'Debe ingresar el numero de carnet'],
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value: string) => value.length >= 1, 'Debe ingresar el apellido'],
  phone: [(value: number) => value != 0, 'Debe ingresar el numero de telefono'],
  birthDate: [(value: Date) => value != null, 'Debe ingresar la fecha de nacimiento'],
  gender: [(value: string) => value.length >= 1, 'Debe ingresar el genero'],
  allergies: [(value: string) => value.length >= 1, 'Debe ingresar la alergia'],
  bloodType: [(value: string) => value.length >= 1, 'Debe ingresar tipo de sangre'],
}

export const SpeakerCreate = (props: createProps) => {
  const {
    open,
    handleClose,
    item,
  } = props;
  const { createSpeaker, updateSpeaker } = useSpeakerStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const {
    identityCard, name, lastName, phone, birthDate, gender, allergies, bloodType,
    onInputChange, isFormValid, onResetForm, onValueChange,
    identityCardValid, nameValid, lastNameValid, phoneValid, birthDateValid, genderValid, allergiesValid, bloodTypeValid,
  } = useForm(item ?? formFields, formValidations);

  const sendSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    if (item == null) {
      createSpeaker(
        {
          identityCard: parseInt(identityCard),
          name: name.trim(),
          lastName: lastName.trim(),
          phone: parseInt(phone),
          birthDate: birthDate,
          gender: gender,
          allergies: allergies,
          bloodType: bloodType,
        });
    } else {
      updateSpeaker(item.patientId,
        {
          identityCard: identityCard,
          name: name.trim(),
          lastName: lastName.trim(),
          phone: phone,
          birthDate: birthDate,
          gender: gender,
          allergies: allergies,
          bloodType: bloodType,
        });
    }
    handleClose();
    onResetForm();
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{item == null ? 'Nuevo Paciente' : `${item.name}`}</DialogTitle>
        <form onSubmit={sendSubmit}>
          <DialogContent sx={{ display: 'flex' }}>
            <Grid container>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Carnet de Identidad"
                  name="identityCard"
                  value={identityCard}
                  onChange={onInputChange}
                  error={!!identityCardValid && formSubmitted}
                  helperText={formSubmitted ? identityCardValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
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
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Apellido"
                  name="lastName"
                  value={lastName}
                  onChange={onInputChange}
                  error={!!lastNameValid && formSubmitted}
                  helperText={formSubmitted ? lastNameValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Genero"
                  name="gender"
                  value={gender}
                  onChange={onInputChange}
                  error={!!genderValid && formSubmitted}
                  helperText={formSubmitted ? genderValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Telefono"
                  name="phone"
                  value={phone}
                  onChange={onInputChange}
                  error={!!phoneValid && formSubmitted}
                  helperText={formSubmitted ? phoneValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentDate
                  title="Fecha de nacimiento"
                  date={birthDate}
                  onChange={(date) => onValueChange('birthDate', date)}
                  error={!!birthDateValid && formSubmitted}
                  helperText={formSubmitted ? birthDateValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Alergias"
                  name="allergies"
                  value={allergies}
                  onChange={onInputChange}
                  error={!!allergiesValid && formSubmitted}
                  helperText={formSubmitted ? allergiesValid : ''}
                />
              </Grid>
              <Grid item xs={12} sm={4} sx={{ padding: '5px' }}>
                <ComponentInput
                  type="text"
                  label="Tipo de sangre"
                  name="bloodType"
                  value={bloodType}
                  onChange={onInputChange}
                  error={!!bloodTypeValid && formSubmitted}
                  helperText={formSubmitted ? bloodTypeValid : ''}
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
