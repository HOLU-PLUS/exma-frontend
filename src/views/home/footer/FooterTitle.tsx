import { Typography } from '@mui/material'

export const FooterTitle = ({ text }: any) => {
  return (
    <Typography
      variant='h6'
      component='h6'
      sx={{
        fontWeight: '700',
        textTransform: 'capitalize',
        pb: 1,
      }}
    >
      {text}
    </Typography>
  )
}