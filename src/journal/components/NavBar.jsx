import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';


export const NavBar = ({ drawerWidth = 240 }) => {
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
                <IconButton color='error'>
                    <LogoutOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
