import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updatedNote } from './';



export const startNewNote = () => {

    return async( dispatch, getState ) => {
        
        //Se despacha la accion 'guardando nota'
        dispatch( savingNewNote() );

        //Se obtienen el Id de estado de la autenticacion
        const { uid } = getState().auth;

        //Un objeto con una nota vacia
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        //Se le dice a firebase la ruta donde guardara la nota
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes` ) );
        //Se envia a firebase la nota
        const setDocResp = await setDoc( newDoc, newNote );

        /*
            Se agrega la propiedad id
            que genera firebase, se 
            agrega a newNote
        */
        newNote.id = newDoc.id; 

        //Se despacha la accion 'agregar nueva nota'
        dispatch( addNewEmptyNote( newNote ) );
        //Se despacha la accion que activa la nota actual
        dispatch( setActiveNote( newNote ) );

    }

}


export const startLoadingNotes = ( ) => {
    return async( dispatch, getState ) => {

        //Se obtienen el Id de estado de la autenticacion
        const { uid } = getState().auth;
        //Error si no existe id del usuario
        if ( !uid ) throw new Error( 'El UID del usuario no existe' );

        //Se carga las notas de firebase
        const notes = await loadNotes( uid ) ;

        dispatch( setNotes( notes ) );

    }
}

export const startSaveNote = () => {

    return async( dispatch, getState ) => {

        //Desapacha la accion para decir que esta guardando
        dispatch( setSaving() );

        //Se obtienen el Id de estado de la autenticacion
        const { uid } = getState().auth;

        //Obtiene la nota activa del store
        const { active: noteActive } = getState().journal;

        //Exparse todas las props de la noteActive a la constante
        const noteToFireStore = { ...noteActive };
        //Elimina una propiedad de un objeto, se borra el id 
        delete noteToFireStore.id;
        
        //La ruta donde queremos hacer los cambios a la nota activa
        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ noteActive.id }` );

        //Efectua los cambios en la base de datos
        await setDoc( docRef, noteToFireStore, { merge: true } );

        //Actualizamos las notas
        dispatch( updatedNote( noteActive ) );

    }

}

