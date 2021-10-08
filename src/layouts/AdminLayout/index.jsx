import { createTheme, Divider, List, ListItem,ListItemText,ListItemIcon, ListSubheader, ThemeProvider, Toolbar, styled, Drawer } from '@mui/material';
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Header from '../../components/Header';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import CategoryIcon from '@mui/icons-material/Category';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const adminTheme = createTheme();


const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      height: '100vh',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);


export default function AdminLayout({ children, page }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const history = useHistory()
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const {auth,logout} = useAuth()

  async function handleLogout() {
    try{
      await logout()
    }catch(err){
      console.error(err);
    }
    
  }


  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ display: 'flex' }}>
        <Header open={openDrawer} tgDrawer={toggleDrawer} pageName={page} />
        <StyledDrawer variant="permanent" open={openDrawer} anchor="left">
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <div>
          <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon/>
              </ListItemIcon>
              <ListItemText primary={auth.email} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon/>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
          <Divider />
          <div> 
              <ListSubheader inset> 
                Manutenções
             </ListSubheader>
              
            <ListItem component={Link} to={"/categoria"} >
              <ListItemIcon>
                <CategoryIcon/>
              </ListItemIcon>
              <ListItemText primary="Categorias" />
            </ListItem>
            <ListItem component={Link} to={"/filme"}>
              <ListItemIcon>
              <LocalMoviesIcon />
              </ListItemIcon>
              <ListItemText primary="Filmes" />
            </ListItem>
          </div>
        </StyledDrawer>
        <Box component="main"  sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '90vh',
            marginTop:'10vh',

            overflow: 'auto',
          }}> 
        {children}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
