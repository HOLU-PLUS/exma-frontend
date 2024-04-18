import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import { useAuthStore, useGuestStore, useLogoutStore } from '@/hooks';
import QRCode from 'react-qr-code';
import { ComponentButton } from '@/components';
import { SearchProfile } from './SearchProfile';
import { useState } from 'react';

export const ProfileCard = () => {
  const { guest } = useGuestStore();
  const { startLogout } = useLogoutStore();

  const { checkAuthGuest } = useAuthStore();

  const [openDialog, setopenDialog] = useState(false);
  const handleDialog = (value: boolean) => {
    setopenDialog(value);
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ px: 2 }}>
        <Grid item sx={{ p: '1.5rem 0rem', textAlign: 'center' }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              <PhotoCameraIcon
                sx={{
                  border: '5px solid white',
                  backgroundColor: '#f2f2f2',
                  borderRadius: '50%',
                  padding: '.2rem',
                  width: 35,
                  height: 35,
                }}
              ></PhotoCameraIcon>
            }
          >
            <Avatar
              sx={{ width: 100, height: 100, mb: 1.5 }}
              src="https://media.glamour.com/photos/5a425fd3b6bcee68da9f86f8/master/pass/best-face-oil.png"
            ></Avatar>
          </Badge>

          {/* DESCRIPTION */}
          <Typography variant="h6">{guest.name}</Typography>
          <Typography color="text.secondary">sd</Typography>
          <QRCode style={{ height: 'auto', maxWidth: '50vh', width: '50%' }} value={guest.codeQr} />
          {checkAuthGuest() && (
            <>
              <div style={{ height: 10 }} />
              <ComponentButton
                text="Buscar con Perfiles"
                width="100%"
                onClick={() => handleDialog(true)}
              />
              <div style={{ height: 10 }} />
              <ComponentButton text="Salir Sesión" width="100%" onClick={() => startLogout()} />
            </>
          )}
        </Grid>
      </Grid>
      {openDialog && <SearchProfile open={openDialog} handleClose={() => handleDialog(false)} />}
    </>
  );
};
