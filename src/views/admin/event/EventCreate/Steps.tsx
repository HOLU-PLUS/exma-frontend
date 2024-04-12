import { Box, Button, Dialog, DialogContent, DialogTitle, Step, StepButton, Stepper } from '@mui/material';
import { useState } from 'react';
import { EventCreate, StepsActivity } from '.';
import { FormEventModel, FormEventValidations } from '@/models';
import { useForm } from '@/hooks';
interface createProps {
  open: boolean;
  handleClose: () => void;
  item: any;
}

const steps = ['Nuevo evento', 'Actividades', 'Confirmación'];

const formFields: FormEventModel = {
  name: 'evento de prueba',
  description: 'descripción de prueba',
  price: 1,
  start: new Date(),
  end: new Date(),
  activities: [],
};

const formValidations: FormEventValidations = {
  name: [(value: string) => value.length >= 1, 'Debe ingresar el nombre'],
  description: [(value: string) => value.length >= 1, 'Debe ingresar la descripción'],
  price: [(value: number) => value != null, 'Debe ingresar el nombre'],
  start: [(value: Date) => value != null, 'Debe ingresar la fecha inicio'],
  end: [(value: Date) => value != null, 'Debe ingresar la fecha fin'],
};

export const EventCreateSteps = (props: createProps) => {
  const { open, handleClose, item } = props;
  // const { createEvent, updateEvent } = useEventStore();

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };
  const handleSkip = () => {
    setActiveStep((step) => step + 1);
  };
  const [formSubmitted, setFormSubmitted] = useState(false);
  const data = useForm(item ?? formFields, formValidations);
  const { isFormValid, onResetForm } = data;
  const sendSubmit = () => {
    console.log(item);
    setFormSubmitted(true);
    if (!isFormValid) return;
    handleSkip();
    // if (item == null) {
    //   createEvent({
    //     name: data.name.trim(),
    //     description: description.trim(),
    //     price: parseInt(price),
    //     start,
    //     end,
    //     activities: [],
    //   });
    // } else {
    //   updateEvent(item.treatmentId, {
    //     name: name.trim(),
    //     description: description.trim(),
    //     price,
    //     start,
    //     end,
    //     activities: [],
    //   });
    // }
    onResetForm();
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{item == null ? 'Nuevo Evento' : `${item.name}`}</DialogTitle>
        <DialogContent>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit">{label}</StepButton>
              </Step>
            ))}
          </Stepper>
          <>
            {(() => {
              switch (activeStep) {
                case 0:
                  return <EventCreate values={data} formSubmitted={formSubmitted} />;
                case 1:
                  return <StepsActivity />;
                default:
                  return <></>;
              }
            })()}

            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                Atrás
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button color="inherit" onClick={sendSubmit} sx={{ mr: 1 }}>
                Siguiente
              </Button>
            </Box>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
};
