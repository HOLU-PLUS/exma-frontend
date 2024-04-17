import { Grid } from '@mui/material';
import { ProfileCard, SettingsCard } from '.';

export const Profile = () => {
  return (
    <Grid container direction={{ xs: 'column', md: 'row' }}>
      <Grid item xs={12} sm={3}>
        <ProfileCard />
      </Grid>
      <Grid item xs={12} sm={9}>
        <SettingsCard />
      </Grid>
    </Grid>
  );
};
