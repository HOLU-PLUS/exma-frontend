import { ComponentButton, ComponentInput } from "@/components"
import { useForm, useGuestStore } from "@/hooks"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { IconButton, Typography } from "@mui/material"
import { useState } from "react"

const loginFormFields = {
  email: '',
  password: '',
}
const formValidations = {
  email: [(value: any) => value.length >= 1, 'Debe ingresar su cuenta'],
  password: [(value: any) => value.length >= 4, 'La contraseña debe de tener más de 6 letras.'],
}

export const LoginCustomer = () => {

  const { logInGuest } = useGuestStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(loginFormFields, formValidations);



  const loginSubmit = (event: any) => {
    event.preventDefault();
    setFormSubmitted(true);
    if (!isFormValid) return;
    logInGuest({ email, password });
  }

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: 30 }}>
      <form onSubmit={loginSubmit}>
        <Typography variant="h4">Iniciar Sesión</Typography>
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
        <ComponentInput
          type={showPassword ? 'text' : 'password'}
          label="Contraseña"
          name="password"
          value={password}
          onChange={onInputChange}
          endAdornment={(
            <IconButton onClick={handleTogglePasswordVisibility} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          )}
          error={!!passwordValid && formSubmitted}
          helperText={formSubmitted ? passwordValid : ''}
        />
        <div style={{ height: 10 }} />
        <ComponentButton type="submit" text="INGRESAR" width="100%" />
      </form>
    </div>
  )
}
