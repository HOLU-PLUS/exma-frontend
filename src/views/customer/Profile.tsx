import { Grid } from '@mui/material';
import { ProfileCard, SettingsCard } from '.';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGuestStore } from '@/hooks';

export const Profile = () => {
  let params = useParams();
  console.log(params.codeQr)
  const { guest, getGuest } = useGuestStore();

  useEffect(() => {
    getGuest(params.codeQr ?? '');
  }, []);

  return (
    <>
    {
      guest &&
    <Grid container direction={{ xs: 'column', md: 'row' }}>
      <Grid item xs={12} sm={3}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} sm={9}>
        <SettingsCard />
      </Grid>
    </Grid>
    }
    </>
  );
};
