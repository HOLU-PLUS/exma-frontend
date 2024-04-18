import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';

interface Props {
  open: boolean;
  handleClose: () => void;
}
export const SearchProfile = (props: Props) => {
  const { open, handleClose } = props;
  const navigate = useNavigate();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{'Buscar Perfil'}</DialogTitle>
      <DialogContent sx={{ display: 'flex' }}>
        <div style={{ width: '100%' }}>
          <QrReader
            onResult={(result: any, error: any) => {
              if (!!result) {
                console.log(`result ${result?.text}`);
                // sendSubmit(result?.text);
                navigate(`/profile/${result?.text}`)
              }
              if (!!error) {
                console.info(error);
              }
            }}
            constraints={{ facingMode: 'user' }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
