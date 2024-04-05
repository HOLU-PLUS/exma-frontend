import { ComponentButton } from "@/components";
import { PaymentModel, PermissionModel, ThethModel, EventModel } from "@/models";
import { Payment } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, Stack, SvgIcon, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { FormPayment } from ".";
import { useAuthStore, useEventStore } from "@/hooks";

interface dialogProps {
  open: boolean;
  handleClose: () => void;
  treatmentId: number;
}
export const TreatmentDialog = (props: dialogProps) => {
  const {
    open,
    handleClose,
    treatmentId,
  } = props;

  const { events = [] } = useEventStore();
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState<EventModel>()
  const { roleUser } = useAuthStore();
  const handleModal = (value: boolean) => {
    setModal(value);
  };
  useEffect(() => {
    setEvent(events.find((treatment: EventModel) => treatment.id === treatmentId))
  }, [events, treatmentId])

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
      >
        {event && <DialogContent>
          <DialogTitle >
            {event.description}
          </DialogTitle>
          <Typography variant="subtitle1">
            {`Etapa: ${event.stageType.name}`}
          </Typography>
          <Typography variant="subtitle1">
            {`Paciente: ${event.patient.user.name} ${event.patient.user.lastName}`}
          </Typography>
          {/* <Typography variant="subtitle1">
            {`Carnet: ${event.patient.user.identityCard}`}
          </Typography> */}
          {/* <Typography variant="subtitle1">
            {`Contacto: ${event.patient.user.phone}`}
          </Typography> */}
          <Typography variant="subtitle1">
            {`Dientes:`}
          </Typography>
          {/* tabla de dientes */}
          <Table sx={{ minWidth: 350 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.thethIds.map((theth: ThethModel) => {
                return (
                  <TableRow key={theth.id} >
                    <TableCell>{theth.name}</TableCell>
                    <TableCell>{theth.description}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Stack
            direction="row"
            justifyContent="space-between"
          >
            <Typography variant="subtitle1">
              {`Monto adeudado: ${event.amountDue} Bs`}
            </Typography>
            <ComponentButton
              text="Registrar pago"
              onClick={() => handleModal(true)}
              startIcon={<SvgIcon fontSize="small"><Payment /></SvgIcon>}
              disable={event.amountDue <= 0 && !roleUser.permissions.find((permission: PermissionModel) => permission.name === "efectuar pago")}
            />
          </Stack>
          {event.payments.length > 0 && <Table sx={{ minWidth: 350 }} size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#E2F6F0' }}>
                <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Descuento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {event.payments.map((payment: PaymentModel) => {
                return (
                  <TableRow key={payment.id} >
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>{payment.discount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>}
        </DialogContent>}
      </Dialog>
      {
        modal && event &&
        <FormPayment
          treatmentId={treatmentId}
          amountTotal={event.amountDue}
          open={modal}
          handleClose={() => handleModal(false)}
        />
      }
    </>
  )
}