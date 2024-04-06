import { ComponentButton } from "@/components";
import { useEventStore } from "@/hooks";
import { EventModel } from "@/models";
import { SpatialTracking } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, SvgIcon } from "@mui/material"
import { Scanner } from '@yudiel/react-qr-scanner';

interface dialogProps {
  open: boolean;
  handleClose: () => void;
  event: EventModel;
}
export const EventDialog = (props: dialogProps) => {
  const {
    open,
    handleClose,
    event,
  } = props;

  const { registerAttendanceEvent } = useEventStore();
  const sendSubmit = (result: string) => {
    registerAttendanceEvent({
      eventId: event.id,
      qrGuest: result,
    });
    handleClose();
  }

  return (
    <>
      <Dialog
        maxWidth="xl"
        open={open}
        onClose={handleClose}
      >
        {
          event && <DialogContent>
            <DialogTitle >
              {event.name}
            </DialogTitle>
            <Scanner
              onResult={(text, result) => sendSubmit(text)}
              onError={(error) => console.log(error?.message)}
            />
            <ComponentButton
              text="Registrar asistencia"
              onClick={() => { }}
              startIcon={<SvgIcon fontSize="small"><SpatialTracking /></SvgIcon>}
            />
          </DialogContent>
        }
      </Dialog>
    </>
  )
}