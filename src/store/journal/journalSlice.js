

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
            
        },

        updateNote: ( state, action ) => {
            
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
    
 } = journalSlice.actions;
