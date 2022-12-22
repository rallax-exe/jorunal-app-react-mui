import { useSelector } from 'react-redux';
import { SideBarItem } from './';
import { Drawer, Box, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material';



// Functional component que crear un sidebar
export const Sidebar = ({ drawerWidth = 240 }) => {

    //Toma el nombre del usuario del store
    const { displayName } = useSelector( state => state.auth );

    //Toma las notas del store
    const { notes } = useSelector( state => state.journal );


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
                    { displayName }
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    notes.map( note => (
                        <SideBarItem 
                            key={ note.id } { ...note }
                        />
                    ))
                }
            </List>
            
        </Drawer>

    </Box>

  )
}
