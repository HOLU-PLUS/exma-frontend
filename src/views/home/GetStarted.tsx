import {
  Box,
  Grid,
  styled,
  Typography,
} from '@mui/material'
// img
import imgDetail from '@/assets/images/event.png';
import imgDetail2 from '@/assets/images/event.png';
import { Title } from '.';


export const GetStarted = () => {

  const CustomGridItem = styled(Grid)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  })

  const CustomTypography = styled(Typography)({
    fontSize: '1.1rem',
    textAlign: 'start',
    lineHeight: '1.5',
    color: '#515151',
    marginTop: '1.5rem',
  })

  return (

    <Grid container spacing={{ xs: 4, sm: 4, md: 0 }}
      sx={{
        py: 10,
        px: 2,

      }}
    >
      <CustomGridItem item xs={12} sm={8} md={6}
      // component = 'section'

      >
        <Box component='article'
          sx={{
            px: 4,
          }}
        >
          <Title
            text={
              'Se lo ponemos fácil a inquilinos y propietarios'
            }
            textAlign={'start'}
          />
          <CustomTypography>
            Los listados se actualizan continuamente para que usted<br />
            no se perderá las casas que acaban de llegar<br />
            mercado hasta encontrar tu casa perfecta.
          </CustomTypography>
        </Box>

      </CustomGridItem>

      <Grid item xs={12} sm={4} md={6}>
        <img src={imgDetail} alt=""
          style={{
            width: '100%',
          }}
        />
      </Grid>

      <Grid item xs={12} sm={4} md={6}
        sx={{
          order: { xs: 4, sm: 4, md: 3 }
        }}
      >
        <img src={imgDetail2} alt=""
          style={{
            width: "100%",
          }}
        />
      </Grid>

      <CustomGridItem item xs={12} sm={8} md={6}
        sx={{
          order: { xs: 3, sm: 3, md: 4 }
        }}
      >
        <Box component='article'
          sx={{
            px: 4,
          }}
        >
          <Title
            text={
              'Encuentra con el mejor agente'

            }
            textAlign={'start'}
          />
          <CustomTypography>
            Nuestros agentes socios verificados son expertos locales que<br />
            Obtenga un promedio de 4,8/5 estrellas de compradores y vendedores.
          </CustomTypography>
        </Box>
      </CustomGridItem>
    </Grid>
  )
}