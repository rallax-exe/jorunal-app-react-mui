

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        /*
        active: {
            id: 'ABC123',
            title: '',
            body: '',
            date: 1234567,
            imageUrls: [], //https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
        }
        */

    },
    reducers: {

        savingNewNote: ( state ) => {
            state.isSaving = true;
        },

        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;
        },

        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSaved = '';
        },

        setNotes: ( state, action ) => {
            state.notes = action.payload ;
        },

        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSaved = '';
        },

        updatedNote: ( state, action ) => { //Payload: note actualizada
            //Pone isSaving en falso
            state.isSaving = false;
            //Recorre todas las notas del arreglo
            state.notes = state.notes.map( note => {
                /*
                    Por cada nota, pregunta si el id guardado
                    es igual al id que queremos actualizar
                */
                if( note.id === action.payload.id ){
                    /*
                        Guarda la nueva version de la nota, 
                        en la iteracion que esta
                    */
                    return action.payload;
                }
                //Regrea nota por cada iteracion
                return note;

            });

            //Mostrar mensaje de actualizacion
            state.messageSaved = `${action.payload.title}, actualizada correctamente`;
        },

        setPhotosToActiveNote: ( state, action ) => {
                                    //Conserva las imagenes anteriores, inserta las nuevas
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },

        clearNotesLogout: ( state ) => {

            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;

        },

        deleteNoteById: ( state, action ) => {

            state.active = null;
            //Filtra y regresa las notas que sean diferente al id que viene en el payload
            state.notes = state.notes.filter( note => note.id !== action.payload );

        },
    }
});


// Action creators are generated for each case reducer function
export const { 
  
    addNewEmptyNote,
    clearNotesLogout,
    deleteNoteById,
    savingNewNote,
    setActiveNote,
    setNotes,
    setPhotosToActiveNote,
    setSaving,
    updatedNote,
    updateNote,
    
 } = journalSlice.actions;
