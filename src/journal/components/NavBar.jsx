import { useDispatch } from 'react-redux';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { startLogout } from '../../store/auth';


// Functional component que crear un navbar
export const NavBar = ({ drawerWidth = 240 }) => {

    const dispatch = useDispatch();

    // Despacha el proceso para hacer el logout
    const onLogout = () => {
        dispatch( startLogout() );
    }

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: {sm: `calc(100% - ${ drawerWidth }px)`},
            ml: { sm: `${ drawerWidth }px`}
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge='start'
                /* 
                En pantallas muy pequenias muestra el boton del 
                navbar y en pantallas medianas muestra el espacio
                para el sidebar
                 */
                sx={{ mr: 2, display: {sm: 'none'} }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>JournalApp</Typography>

                <IconButton 
                    color='error'
                    onClick={ onLogout }
                >
                    <LogoutOutlined />
                </IconButton>

            </Grid>

        </Toolbar>
    </AppBar>
  )
}
