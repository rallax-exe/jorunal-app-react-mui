import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
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


// Para iniciar sesion con correo y contrasenia
export const startLoginWithEmailPassword = (  { email, password  }  ) => {

    return async( dispatch ) => {

        // Cambia el estado de checking, esto ayuda a bloquear botones 
        dispatch( checkingCredentials() );

        // esperamos la respuesta de nuestro provider
        const result = await loginWithEmailPassword( { email, password } );

        // Si la prop ok esta es false enntonces manda mensaje de error
        if ( !result.ok ) return dispatch( logout( result ) );

        // Despachamos el login en caso de que la prop ok es true 
        dispatch( login( result ) );

    }

}


export const startLogout = () => {

    return async( dispatch ) => {

        // Cierra sesion en Firebase
        await logoutFirebase();
        //Limpia el state del journalSlice
        dispatch( clearNotesLogout() );
        //Llama la accion del authSlice para cerrar sesion y hacer limpieza
        dispatch( logout() );

    }

}


