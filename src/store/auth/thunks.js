import { checkingCredentials } from './';

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

    }
};