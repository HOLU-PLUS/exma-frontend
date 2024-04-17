import { ComponentButton } from '@/components';
import { Add } from '@mui/icons-material';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { CalendarDiary, CreateDiary } from '.';
import { useState } from 'react';
import { AvailabilityModel } from '@/models';

export const DiaryView = () => {
  const [openDialog, setopenDialog] = useState(false);
  const [itemAvailability, setAvailabilityEdit] = useState<AvailabilityModel | null>(null);

  const handleDialog = (value: boolean) => {
    setopenDialog(value);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Disponibilidad</Typography>
        <ComponentButton
          text="Registrar Disponibilidad"
          onClick={() => {
            // resetEvent(null);
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
      <CalendarDiary />
      {openDialog && (
        <CreateDiary
          open={openDialog}
          handleClose={() => handleDialog(false)}
          item={itemAvailability}
        />
      )}
    </>
  );
};
