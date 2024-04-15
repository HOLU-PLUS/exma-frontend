import { Button, Drawer, Typography } from '@mui/material';
import { QrReader } from 'react-qr-reader';

export const RegisterAttendance = (props: any) => {
  const { opendrawer, handleDrawer, sendSubmit } = props;

  return (
    <Drawer
      PaperProps={{
        style: {
          top: 'auto',
          bottom: 0,
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', // Centrar verticalmente
          alignItems: 'center', // Centrar horizontalmente
          width: 'auto', // Ancho automático
        },
      }}
      anchor="bottom"
      open={opendrawer}
      onClose={() => handleDrawer(false)}
      style={{ zIndex: 9998 }}
    >
      <div>
        <Typography variant="h5">Registro de asistencia</Typography>
        <div style={{ width: '100%' }}>
          {' '}
          {/* Ancho completo */}
          <QrReader
            onResult={(result: any, error: any) => {
              if (!!result) {
                sendSubmit(result?.text);
              }
              if (!!error) {
                console.info(error);
              }
            }}
            constraints={{ facingMode: 'user' }}
          />
        </div>
        <Button onClick={() => handleDrawer(false)}>Cancelar</Button>
      </div>
    </Drawer>
  );
};
