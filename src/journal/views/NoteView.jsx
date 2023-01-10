import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { useForm } from '../../hooks/useForm';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components';
import { useRef } from 'react';




export const NoteView = () => {

    const dispatch = useDispatch();

    //Selecciona el estado de la store
    const { active: noteActive, messageSaved, isSaving } = useSelector( state => state.journal );

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

    }, [formState]);


    //Si messageSaved cambia y tiene mas de un la letra ejecuta el mensaje
    useEffect(() => {
        
        if( messageSaved.length > 0 ){
            Swal.fire( 'Nota Actualizada', messageSaved, 'success' );
        }

    }, [messageSaved]);


    //Obtiene la referencia del elemento HTML
    const fileInputRef = useRef();


    //Actualiza la nota en firebase y en la store
    const onSaveNote = () => {

        dispatch( startSaveNote() );

    }

    //Recibe los archivos y los manda al thunk para subir a Cloudinary
    const onFileInputChange = ({ target }) => {

        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );

    }

    const onDelete = () => {

        dispatch( startDeletingNote() );

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

            <input 
                type="file"
                multiple
                //Se obtiene la referencia del Input en el HTML (se usa la sintaxis de React)
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton

                color="primary"
                disabled={ isSaving }
                //Esto va a simular el click en el Input de arriba
                onClick={ ()=> fileInputRef.current.click() }

            >

                <UploadOutlined />

            </IconButton>

            <Button 
                disabled={ isSaving }
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

        <Grid
            container justifyContent='end'
        >

            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>

        </Grid>

        {/*IMG GALLERY*/}
        <ImageGallery images={ noteActive.imageUrls } />

    </Grid>
  )
}
