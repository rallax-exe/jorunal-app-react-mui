import { TurnedInNot } from '@mui/icons-material';
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';


// Functional component que crear un sidebar
export const Sidebar = ({ drawerWidth = 240 }) => {
  return (
    <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >

        <Drawer
            variant='permanent' //temporary
            open
            sx={{
                display: { xs: 'block' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
            /*onClose  para cerrar*/
        >
            <Toolbar>
                <Typography variant='h6' noWrap componen='div'>
                    Raul Lara
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map( text => (
                        <ListItem key={ text } disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={ text }/>
                                    <ListItemText secondary={ 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quas odio suscipit nisi exercitationem laudantium.'}/>                                    
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>
            
        </Drawer>

    </Box>

  )
}
