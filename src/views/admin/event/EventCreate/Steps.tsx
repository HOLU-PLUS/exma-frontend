import { Box, Button, Dialog, DialogContent, DialogTitle, Step, StepButton, Stepper } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { EventConfrim, EventCreate, StepsActivity } from '.';
import { useEventStore } from '@/hooks';
interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const steps = ['Nuevo evento', 'Actividades', 'Confirmación'];

export const EventCreateSteps = (props: createProps) => {
  const { open, handleClose, item } = props;
  const {createEvent,resetEvent} = useEventStore();
  const eventCreateRef: any = useRef();

  const [activeStep, setActiveStep] = useState(0);

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };
  const handleSkip = async () => {
    if (activeStep == 0 && !eventCreateRef.current!.validate()) return;
    if (activeStep == 2){
      await createEvent();
      resetEvent();
      handleClose();
      return;
    }
    setActiveStep((step) => step + 1);
  };

  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if(activeStep==0)setDisable(false);
  }, [activeStep])
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{item == null ? 'Nuevo Evento' : `${item.name}`}</DialogTitle>
      <DialogContent>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <>
          {(() => {
            switch (activeStep) {
              case 0:
                return <EventCreate ref={eventCreateRef} />;
              case 1:
                return <StepsActivity disable={(v) => setDisable(v)} />;
              case 2:
                return <EventConfrim/>
              default:
                return <></>;
            }
          })()}

          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Atrás
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button color="inherit" onClick={handleSkip} disabled={disable} sx={{ mr: 1 }}>
              {activeStep==2?`Guardar`:`Siguiente`}
            </Button>
          </Box>
        </>
      </DialogContent>
    </Dialog>
  );
};
