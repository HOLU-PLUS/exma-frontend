import { ComponentButton } from '@/components';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { CalendarComponent } from '.';
import { Add } from '@mui/icons-material';
import { EventCreateSteps } from '../event';
import { useEventStore } from '@/hooks';

export const CalendarView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const { resetEvent } = useEventStore();
  /*CONTROLADOR DEL DIALOG PARA CREAR O EDITAR */
  const handleDialog = (value: boolean) => {
    setopenDialog(value);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerHeight]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Eventos</Typography>
        <ComponentButton
          text="Nuevo evento"
          onClick={() => {
            resetEvent(null);
            handleDialog(true);
          }}
          startIcon={
            <SvgIcon fontSize="small">
              <Add />
            </SvgIcon>
          }
        />
      </Stack>
      <div style={{ height: 10 }} />
      <CalendarComponent screenHeight={screenHeight} />
      {openDialog && <EventCreateSteps open={openDialog} handleClose={() => handleDialog(false)} />}
    </>
  );
};
