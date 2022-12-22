

import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        MessageSaved: '',
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
        },

        setNotes: ( state, action ) => {
            state.notes = action.payload ;
        },

        setSaving: ( state ) => {
            state.isSaving = true;
            //Hacer mensaje de error
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
        },

        deleteNoteById: ( state, action ) => {

        },
    }
});


// Action creators are generated for each case reducer function
export const { 
  
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    updatedNote,
    
 } = journalSlice.actions;
