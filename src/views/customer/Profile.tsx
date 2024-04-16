import { Avatar, Grid, Typography } from '@mui/material';
import imgPerson from '@/assets/images/person.jpg';
import { ComponentButton } from '@/components';
import { useAuthStore, useLogoutStore } from '@/hooks';
import QRCode from 'react-qr-code';

export const Profile = () => {
  const { user } = useAuthStore();
  const { startLogout } = useLogoutStore();
  return (
    <>
      <Grid container direction="row">
        <Grid item xs={12} md={3} sx={{ py: 2, px: 4 }}>
          <Typography variant="h4">Mi perfil</Typography>
          <Avatar alt="Remy Sharp" src={imgPerson} sx={{ width: 300, height: 300 }} />
          <Typography variant="h6">{user}</Typography>
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={localStorage.getItem('qr')!}
            viewBox={`0 0 256 256`}
          />
          <ComponentButton
            type="submit"
            text="Salir Sesión"
            width="100%"
            onClick={() => startLogout()}
          />
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography>Mi Contenido</Typography>
          {/* Agrega aquí tu contenido */}
        </Grid>
      </Grid>
    </>
  );
};
