import { ComponentButton } from '@/components';
import { Add } from '@mui/icons-material';
import { Stack, SvgIcon, Typography } from '@mui/material';
import { CalendarDiary, CreateDiary } from '.';
import { useState } from 'react';
import { AvailabilityModel } from '@/models';
import { useAuthStore } from '@/hooks';

interface Props {
  codeQr: string;
}

export const DiaryView = (props: Props) => {
  const { codeQr } = props;

  const [openDialog, setopenDialog] = useState(false);
  const { checkAuthGuest } = useAuthStore();
  const [itemAvailability, setAvailabilityEdit] = useState<AvailabilityModel | null>(null);

  const handleDialog = (value: boolean) => {
    setopenDialog(value);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6">Disponibilidad</Typography>
        {checkAuthGuest() && (
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
        )}
      </Stack>
      <div style={{ height: 10 }} />
      <CalendarDiary codeQr={codeQr} />
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
