import { Box, Button, styled, Typography } from "@mui/material";
import { Link } from 'react-router-dom'
import headerImg from '@/assets/images/event.png'

export const Header = () => {

  const CustomBox = styled(Box)(({ theme }) => ({
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    paddingTop: theme.spacing(10),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }
  }));

  const BoxText = styled(Box)(({ theme }) => ({
    flex: '1',
    paddingLeft: theme.spacing(8),
    [theme.breakpoints.down('md')]: {
      flex: '2',
      textAlign: 'center',
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));


  return (
    <CustomBox component='header'>
      <BoxText
        component='section'
      >
        <Typography
          variant='h2'
          component='h1'
          sx={{
            fontWeight: 700,
          }}
        >
          We'll build house of your dream
        </Typography>

        <Typography
          // variant='p'
          component='p'
          sx={{
            py: 3,
            lineHeight: 1.6,
          }}
        >
          We have 9000 more review and our customers
          trust on out property and quality products.
        </Typography>

        <Box>
          <Button
            variant='contained'
            sx={{
              mr: 2,
              px: 4,
              py: 1,
              fontSize: '0.9rem',
              textTransform: 'capitalize',
              borderRadius: 0,
              borderColor: '#14192d',
              color: '#fff',
              backgroundColor: '#14192d',
              "&&:hover": {
                backgroundColor: "#343a55"
              },
              "&&:focus": {
                backgroundColor: "#343a55"
              }
            }}
          >
            Registrate ahora
          </Button>
        </Box>
      </BoxText>

      <Box sx={theme => ({
        [theme.breakpoints.down('md')]: {
          flex: '1',
          paddingTop: '30px',
          alignSelf: 'center',
        },
        [theme.breakpoints.up('md')]: {
          flex: '2',
          alignSelf: 'flex-end',
        },
      })}
      >
        <img
          src={headerImg}
          alt="headerImg"
          style={{
            width: "100%",
            marginBottom: -15,
          }}
        />
      </Box>

    </CustomBox>
  )
}
