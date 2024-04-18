import Typography from '@mui/material/Typography';
import { Grid, SvgIcon } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import Badge from '@mui/material/Badge';
import { useAuthStore, useGuestStore, useLogoutStore } from '@/hooks';
import QRCode from 'react-qr-code';
import { ComponentButton } from '@/components';
import { Add } from '@mui/icons-material';

export const ProfileCard = () => {
  const { guest } = useGuestStore();
  const { startLogout } = useLogoutStore();

  const { checkAuthGuest } = useAuthStore();
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
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
      </Grid>
      <QRCode style={{ height: 'auto', maxWidth: '50vh', width: '50%' }} value={guest.codeQr} />
      {checkAuthGuest() && (
        <>
          <ComponentButton
            text="Buscar con QR"
            onClick={() => {
              // resetEvent(null);
              // handleDialog(true);
            }}
          />
          <ComponentButton text="Salir Sesión" onClick={() => startLogout()} />
        </>
      )}
    </Grid>
  );
};
