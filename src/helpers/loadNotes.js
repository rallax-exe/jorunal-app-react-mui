import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';



export const loadNotes = async( uid = '' ) => {

    //Error si el usuario no existe
    if ( !uid ) throw new Error( 'El UID del usuario no existe' );
    
    //Se establece la direcion de la coleccion en firebase
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes` );
    //Se carga los datos de la coleccion
    const docs = await getDocs( collectionRef );

    //Se crea un nuevo arreglo vacio de notas
    const notes = [];

    //Se inserta notas al arreglo vacio
    docs.forEach( doc => {
        /*
            Como le falta el id no viene en la 
            data de cada nota, pero si esta
            como propiedad fuera de la data
            en la respuesta.
            Por eso se le agrega el id y se
            mantiene toda la info de data 
            usando el operador spred (...)
        */
        notes.push({ id: doc.id, ...doc.data() });
    });

    //Se regresa el nuevo arreglo con las notas
    return notes;

}


