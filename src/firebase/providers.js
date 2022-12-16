import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { FirebaseAuth } from './config';



const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {

    try {
        
        //Aqui le decimos a Firebase que usaremos Google
        const result = await signInWithPopup( FirebaseAuth, googleProvider );

        //Esto comentado es para ver todos los datos que regresa Firebase
            //const credentials = GoogleAuthProvider.credentialFromResult( result );
            //console.log({credentials});

        //Obtenemos los datos del usuario
        const { displayName, email, photoURL, uid } = result.user;
        
        // Regresamos los datos basicos del usuario
        return {
            ok: true,
            //User info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        
        //Obtenemos la informacion del error
        const errorCode = error.code;
        const errorMessage = error.message;

        //Regresamos el mensaje del error
        return{
            ok: false,
            errorMessage,
        }

    }

}


export const registerUserWithEmailPassword = async( { email, password, displayName } ) =>{
    try {
        
        const resp = await createUserWithEmailAndPassword( FirebaseAuth, email, password );
        const { uid, photoURL } = resp.user;
        console.log( resp );

        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {

            ok: true,
            uid, photoURL, email, displayName

        }

    } catch (error) {

        //console.log(error);
        return{ ok: false, errorMessage: error.message }

    }
}

