import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setActiveNote, startSaveNote } from '../../store/journal';
import { ImageGallery } from '../components';


export const NoteView = () => {

    const dispatch = useDispatch();

    //Selecciona el estado de la store
    const { active: noteActive } = useSelector( state => state.journal );

    //Se manda campos al custom hook useForm
    const { body, title, date, onInputChange, formState } = useForm( noteActive );

    //Se memoriza la fecha, para convertirla solo una vez en UTC
    const dateString = useMemo( () => {

        //Tipa la fecha que tenemos
        const newDate = new Date( date );
        //Convierte la fecha en un UTC String
        return newDate.toUTCString(); 

    }, [ date ]);

    //Si el formState cambia se le envia la nota activa
    useEffect(() => {
        
        dispatch( setActiveNote( formState ) );

    }, [formState])

    //Actualiza la nota en firebase y en la store
    const onSaveNote = () => {

        dispatch( startSaveNote() );

    }

  return (
    <Grid 
        container direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        sx={{ mb: 1 }}
        className='animate__animated animate__fadeIn animate__faster'
    >

        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>

        <Grid item>
            <Button 
                color='primary' 
                sx={{ padding: 2 }}
                onClick={ onSaveNote }
            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder='Ingrese un titulo'
                label='Titulo'
                sx={{ border: 'none', mb: 1 }}
                name="title" 
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder='Que sucedio hoy?'
                label='Descripcion'
                minRows={ 5 }
                name="body" 
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        {/*IMG GALLERY*/}
        <ImageGallery />

    </Grid>
  )
}
