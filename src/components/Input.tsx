import { TextField, useTheme } from '@mui/material';

interface Props {
  id?: string;
  name: string;
  value: any;
  onChange?: any;
  type: any;
  label: string;
  endAdornment?: any;
  multiline?: boolean;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  customSx?: object;
  size?: any;
  width?: any;
  height?: any;
}

export const ComponentInput = (props: Props) => {
  const {
    id,
    name,
    value,
    onChange,
    type,
    label,
    endAdornment = null,
    multiline = false,
    error = false,
    helperText = '',
    disabled = false,
    customSx = {},
    size = 'Normal',
    width = '100%',
    height = '50px',
  } = props;
  const theme = useTheme();

  return (
    <TextField
      id={id}
      type={type}
      multiline={multiline}
      label={label}
      name={name}
      value={value}
      disabled={disabled}
      size={size}
      onChange={onChange}
      autoComplete="off"
      style={{ width: width }}
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment,
        style: {
          color: 'black',
          height: height,
          borderColor: '#0B815A',
        },
      }}
      sx={{
        ...{
          '& label.Mui-focused': {
            color: 'black',
          },
          '& label:not(.Mui-focused)': {
            color: 'black',
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            height: 'fit-content',
            '& fieldset': { borderColor: theme.palette.primary.main },
            '&:hover fieldset': { borderColor: theme.palette.primary.main },
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
            '&.Mui-error fieldset': { borderColor: error ? 'red' : theme.palette.primary.main },
          },
        },
        ...customSx,
      }}
    />
  );
};
