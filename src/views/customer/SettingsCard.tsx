// IMPORTS
import React from 'react';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Diary } from '.';

export const SettingsCard = () => {
  //TAB STATES
  const [value, setValue] = React.useState('one');

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  //RETURN
  return (
    <>
      <Tabs
        value={value}
        onChange={(_, value) => handleChange(value)}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="one" label="Agenda" />
        <Tab value="two" label="Reuniones" />
        <Tab value="three" label="Cuenta" />
      </Tabs>
      <Divider></Divider>
      <Grid container direction={{ xs: 'column', md: 'row' }} >
        <Grid justifyContent={{ xs: 'center', md: 'flex-end' }} item xs={12}>
          {value == 'one' && <Diary />}
        </Grid>
      </Grid>
    </>
  );
};
