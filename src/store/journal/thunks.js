import { collection, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from './';



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



