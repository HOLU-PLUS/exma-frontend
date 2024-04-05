import { Link } from '@mui/material'

export const FooterLink = ({ text }: any) => {
  return (
    <Link
      href="#"
      // variant='p'
      component='a'
      sx={{
        fontSize: '0.9rem',
        fontWeight: '400',
        textDecoration: 'none',
        color: '#414141',
        textTransform: 'capitalize',
        "&:hover": {
          color: '#1c2859',
        }
      }}
    >
      {text}
    </Link>
  )
}