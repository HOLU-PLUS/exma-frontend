import {
  AppBar,
  Toolbar,
  Box,
  List,
  ListItem,
  Typography,
  styled,
  ListItemButton,
  ListItemText,
} from '@mui/material';
// menu
// rotas
import { Link } from 'react-router-dom';
import DrawerItem from './DrawItem';


// personalizacao
const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const ListMenu = styled(List)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

//rotas
const itemList = [
  {
    text: "Inicio",
    to: "/"
  },
  {
    text: "Nosotros",
    to: "/about"
  },
  {
    text: "Contactanos",
    to: "/contact"
  },
  {
    text: "Empezar",
    to: "/auth"
  },
];

export const Navbar = () => {
  return (
    <AppBar
      component="nav"
      position="sticky"
      sx={{ backgroundColor: 'black' }}
      elevation={0}
    >
      <StyledToolbar>
        <Typography
          variant="h6"
          component="h2"

        >
          EXMA
        </Typography>
        <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
          <DrawerItem />
        </Box>
        <ListMenu>
          {itemList.map((item) => {
            const { text } = item;
            return (
              <ListItem key={text}>
                <ListItemButton component={Link} to={item.to}
                  sx={{
                    color: '#fff',
                    "&:hover": {
                      backgroundColor: 'transparent',
                      color: '#1e2a5a',
                    }
                  }}
                >
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </ListMenu>
      </StyledToolbar>
    </AppBar>
  )
}
