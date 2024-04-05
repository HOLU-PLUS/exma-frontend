import { ComponentButton, ComponentInput } from "@/components"
import { useForm, useGuestStore } from "@/hooks"
import { FormGuestModel, FormGuestValidations } from "@/models"
import { Typography } from "@mui/material"
import { useState } from "react"

const formFields: FormGuestModel = {
  name: '',
  lastName: '',
  email: '',
}

const formValidations: FormGuestValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  lastName: [(value: string) => value.length >= 1, 'Debe ingresar el apellido'],
  email: [(value: string) => value.length >= 1, 'Debe ingresar el apellido'],
}

export const RegisterCustomer = () => {

  const { registerGuest } = useGuestStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { name,lastName, email, onInputChange, isFormValid, nameValid,lastNameValid, emailValid } = useForm(formFields, formValidations);

  const loginSubmit = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    registerGuest({ name, lastName,email});
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 30 }}>
      <form onSubmit={loginSubmit}>
      <Typography variant="h4">Crear una cuenta</Typography>
      <div style={{ height: 10 }} />
        <ComponentInput
          type="text"
          label="Nombre"
          name="name"
          value={name}
          onChange={onInputChange}
          error={!!nameValid && formSubmitted}
          helperText={formSubmitted ? nameValid : ''}
        />
        <div style={{ height: 10 }} />
          <ComponentInput
            type="text"
            label="Apellido"
            name="lastName"
            value={lastName}
            onChange={onInputChange}
            error={!!lastNameValid && formSubmitted}
            helperText={formSubmitted ? lastNameValid : ''}
          />
      <div style={{ height: 10 }} />
        <ComponentInput
          type="text"
          label="Correo"
          name="email"
          value={email}
          onChange={onInputChange}
          error={!!emailValid && formSubmitted}
          helperText={formSubmitted ? emailValid : ''}
        />
        <div style={{ height: 10 }} />
        <ComponentButton type="submit" text="INGRESAR" width="100%" />
      </form>
    </div>
  )
}
