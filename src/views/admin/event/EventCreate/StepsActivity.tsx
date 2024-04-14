import { useState, useEffect } from 'react';
import { Step, StepContent, Stepper, StepButton } from '@mui/material';
import { ActivityCreate } from '.';
import { useEventStore } from '@/hooks';
import { ActivityModel, FormActivityModel } from '@/models';
import { ComponentButton } from '@/components';

interface Props {
  disable: (state: boolean) => void;
}

export const StepsActivity = (props: Props) => {
  const { disable } = props;

  const { event, InsertActivity } = useEventStore();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const addStep = () => {
    const activity: FormActivityModel = {
      id: event.activities[event.activities.length - 1].id+1,
      name: '',
      description: '',
      start: null,
      end: null,
    };
    InsertActivity(activity);
  };

  useEffect(() => {
    console.log(event)
    if (activeStep == event.activities.length) {
      disable(false);
    } else {
      disable(true);
    }
  }, [activeStep, event.activities]);

  return (
    <>
    <ComponentButton onClick={addStep} text="AGREGAR ACTIVIDAD" width="100%" />
      <Stepper activeStep={activeStep} orientation="vertical">
        {event.activities.map((item:ActivityModel,index:number) => (
          <Step key={index}>
            <StepButton color="inherit" onClick={handleStep(index)}>
            {`Actividad N° ${index + 1}`}
            </StepButton>
            <StepContent>
            <ActivityCreate
                key={index}
                id={item.id}
                handleNext={() => handleNext()}
                handleBack={() => handleBack()}
              />
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </>
  );
};
