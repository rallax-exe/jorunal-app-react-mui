import { registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './';

export const checkingAuthentication = ( email, password ) => {
    return async( dispatch ) => {

        //Cambiamos el status a checking
        dispatch( checkingCredentials() );

    }
};

export const startGoogleSignIn = ( email, password ) => {
    return async( dispatch ) => {

        //Cambiamos el status a checking
        dispatch( checkingCredentials() );
        //Llamamos la funcion de Google Sign In
        const result = await signInWithGoogle();


        /*
            Cuando ya tengo el resultado
            quiere decir que ya estoy autenticado
            o hay un error.
            Primero:
            Si hay un error mandamos el error a nuestro state
            para cambiar el estado del errMessage en el slice.
        */

        if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

        /*
            Segundo:
            Si no hay error en el login
            entonces mandamos los datos del usuario
            al state login. El payload es el 'result'.
        */
        dispatch( login( result ) );

    }
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword( { email, password, displayName } );
        if ( !ok ) return dispatch( logout( {errorMessage} ) );

        dispatch( login({ uid, displayName, email, photoURL }));

    }

}