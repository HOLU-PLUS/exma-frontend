// IMPORTS
import React from 'react';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { AccountView, MeetingView, RequestView } from './content';
import { DiaryView } from './content/diary';

export const SettingsCard = () => {
  const [value, setValue] = React.useState('one');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={(_, value) => handleChange(value)}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="one" label="Agenda" />
        <Tab value="two" label="Solicitudes" />
        <Tab value="three" label="Reuniones" />
        <Tab value="four" label="Cuenta" />
      </Tabs>
      <Divider></Divider>
      <Grid container direction={{ xs: 'column', md: 'row' }}>
        <Grid justifyContent={{ xs: 'center', md: 'flex-end' }} item xs={12}>
          {value === 'one' && <DiaryView />}
          {value === 'two' && <RequestView />}
          {value === 'three' && <MeetingView />}
          {value === 'three' && <AccountView />}
        </Grid>
      </Grid>
    </>
  );
};
