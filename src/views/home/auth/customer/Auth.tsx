import { useState } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';

import './styles.css';
import { LoginCustomer } from './Login';
import { RegisterCustomer } from './Register';


export const AuthCustomer = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [signInEmail, setSignInEmail] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');

  const handleOpenSignIn = () => {
    setIsSignIn(true);
    if (signUpEmail) {
      setSignInEmail(signUpEmail);
    }
  };

  const handleOpenSignUp = () => {
    setIsSignIn(false);
    if (signInEmail) {
      setSignUpEmail(signInEmail);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <div className={`container ${isSignIn ? '' : 'right-panel-active'}`}>
          <Grid item xs={12} md={6}>
            <div className="form-container sign-in-container">
              <LoginCustomer />
            </div>
            <div className="form-container sign-up-container">
              <RegisterCustomer />
            </div>
          </Grid>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <Typography variant="h4">EXMA</Typography>
                <p>Ya tengo mi cuenta</p>
                <Button variant="outlined" color="primary" onClick={handleOpenSignIn}>
                  Iniciar Sesión
                </Button>
              </div>
              <div className="overlay-panel overlay-right">
                <Typography variant="h4">EXMA</Typography>
                <p>¿Aún no tienes una cuenta?</p>
                <Button variant="outlined" color="primary" onClick={handleOpenSignUp}>
                  Registrarme
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Container>
  );
};