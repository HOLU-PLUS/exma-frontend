import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Importa el hook useTheme

interface Props {
  date: Date;
  title: string;
  onChange: (value: Date) => void;
  error?: boolean;
  helperText?: string;
  minDate?: Date;
  maxDate?: Date;
}

export const ComponentDate = (props: Props) => {
  const { date, title, onChange, error = false, helperText, minDate, maxDate } = props;
  const theme = useTheme();

  return (
    <>
      <LocalizationProvider adapterLocale="es" dateAdapter={AdapterDayjs}>
        <DatePicker
          value={dayjs(date)}
          label={title}
          minDate={minDate ? dayjs(minDate) : null}
          maxDate={maxDate ? dayjs(maxDate) : null}
          onChange={(v) => onChange(v!.toDate())}
          sx={{
            display: 'flex',
            '& label.Mui-focused': {
              color: 'black',
            },
            '& label:not(.Mui-focused)': {
              color: 'black',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '10px',
              height: '50px',
              '& fieldset': { borderColor: theme.palette.primary.main },
              '&:hover fieldset': { borderColor: theme.palette.primary.main },
              '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
              '&.Mui-error fieldset': { borderColor: error ? 'red' : theme.palette.primary.main },
            },
          }}
        />
      </LocalizationProvider>
      {error && (
        <Typography style={{ color: 'red', fontSize: '0.75rem', padding: '2px' }}>
          {helperText}
        </Typography>
      )}
    </>
  );
};
