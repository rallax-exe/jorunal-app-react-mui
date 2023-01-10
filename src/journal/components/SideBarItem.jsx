import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { setActiveNote } from '../../store/journal';




export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    //Memoriaza el titulo de la nota para eliminar caracteres 
    const newTitle = useMemo( () =>{

        return title.length > 17
                //Corta el titulo, para que tenga maximo 17 caracteres
                //Le concatena '...'
                //En caso contrario regresa el titulo completo
            ?   title.substring( 0, 17 ) + '...'
            :   title;

    },[ title ]);

    //Se llama la funcion dispatch
    const dispatch = useDispatch();

    /*
        Al hacer click en el boton se envia 
        las props como un objeto, que 
        recibira el setActiveNote
    */
    const onClickNote = () => {

        dispatch( setActiveNote( { title, body, id, date, imageUrls } ) );

    }


  return (
    <ListItem disablePadding>
        <ListItemButton
            onClick={ onClickNote }
        >
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>
            <Grid container>
                <ListItemText primary={ newTitle }/>
                <ListItemText secondary={ body }/>
            </Grid>
        </ListItemButton>
    </ListItem>
  )
}
