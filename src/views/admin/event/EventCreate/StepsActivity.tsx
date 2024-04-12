import { useState } from 'react';
import { Box, Step, StepContent, StepLabel, Stepper, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { ActivityCreate } from '.';

export const StepsActivity = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [activities, setActivities] = useState([<ActivityCreate key={0} handleNext={() => handleNext()} disabledBtnBack={activeStep === 0} />]);

  const addStep = () => {
    setActivities((prevActivities) => [
      ...prevActivities,
      <ActivityCreate
        key={prevActivities.length}
        handleNext={() => handleNext()}
        handleBack={() => handleBack()}
      />,
    ]);
  };

  const removeStep = () => {
    if (activities.length > 1) {
      setActivities((prevActivities) => prevActivities.slice(0, -1));
      setActiveStep((prevActiveStep) => Math.min(prevActiveStep, activities.length - 2));
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={removeStep} disabled={activities.length === 1}>
          <RemoveIcon />
        </IconButton>
        <IconButton onClick={addStep}>
          <AddIcon />
        </IconButton>
      </Box>
      <Stepper activeStep={activeStep} orientation="vertical">
        {activities.map((activity, index) => (
          <Step key={index}>
            <StepLabel>{`Actividad N° ${index + 1}`}</StepLabel>
            <StepContent>{activity}</StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
};
