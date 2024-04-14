import { Typography } from '@mui/material';
import { GuestTable } from '.';

export const GuestView = () => {
  return (
    <>
      <Typography variant="h6">Invitados</Typography>
      <div style={{ height: 10 }} />
      <GuestTable />
    </>
  );
};
