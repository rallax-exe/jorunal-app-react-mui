import { useDispatch, useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';
import { startNewNote } from '../../store/journal';


export const JournalPage = () => {

  //Seleccionamos estados de la store
  const { isSaving, active } = useSelector( state => state.journal );

  //Se llama el dispatch
  const dispatch = useDispatch();

  /*
    Al hacer click en el boton rojo se inicia 
    la creacion de una nueva nota
  */
  const onClickNewNote = () => {

    //Se despacha la accion
    dispatch( startNewNote() );

  }

  return (
    
    <JournalLayout>
    
      {/*Si hay notas se muestra la vista si no lo contrario*/}
      {
        (!!active)  ? <NoteView /> 
                    :<NothingSelectedView />
      }

      <IconButton
        onClick={ onClickNewNote }
        disabled={ isSaving }
        size='large'
        sx={{
          color:'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>

      
    </JournalLayout>
         
  )
}
