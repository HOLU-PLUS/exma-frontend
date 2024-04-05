import {
  Button,
  Stack,
} from '@mui/material'
import { Paragraph } from '.'
import { Link } from 'react-router-dom'
import { Title } from '.'

export const GetInTouch = () => {

  return (
    <Stack
      component='section'
      direction="column"
      justifyContent='center'
      alignItems='center'
      sx={{
        py: 10,
        mx: 6,
      }}
    >
      <Title
        text={
          'Contáctenos para comprar propiedad'
        }
        textAlign={'center'}
      />
      <Paragraph
        text={
          'Nuestro compromiso es garantizarle una experiencia \
                de compra de vivienda nueva profesional y agradable. \
                Si quieres conseguir una vivienda para empezar a vivir \
                en familia en una zona que te encanta pulsa el botón de abajo.'
        }
        maxWidth={'sm'}
        mx={0}
        textAlign={'center'}
      />
      <Button component={Link}
        to={'/contact'}
        variant="contained"
        type="submit"
        size="medium"
        sx={{
          fontSize: '0.9rem',
          textTransform: 'capitalize',
          py: 2,
          px: 4,
          mt: 3,
          mb: 2,
          borderRadius: 0,
          backgroundColor: '#14192d',
          "&:hover": {
            backgroundColor: '#1e2a5a',
          }
        }}
      >
        Ponerse en contacto
      </Button>

    </Stack>
  )
}