import { Typography } from '@mui/material'
export const Paragraph = ({ text, maxWidth, mx, textAlign }: any) => {
  return (
    <Typography
      sx={{
        maxWidth: maxWidth,
        mx: mx,
        textAlign: textAlign,
        py: 3,
        color: '#7b7b7b',
      }}
    >
      {text}
    </Typography>
  )
}