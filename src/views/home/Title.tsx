import { Typography } from '@mui/material'

export const Title = ({ text, textAlign }: any) => {
  return (
    <Typography
      variant='h4'
      component='h3'
      sx={{
        fontWeight: '700',
        textAlign: textAlign,
      }}
    >
      {text}
    </Typography>
  )
}
