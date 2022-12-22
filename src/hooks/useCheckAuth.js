import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { login, logout } from '../store/auth';
import { FirebaseAuth } from '../firebase/config';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {

    const { status } = useSelector( state => state.auth );
    const dispatch = useDispatch();
  
  
    //Siempre esta revisando si estamos logeados 
    useEffect(() => {
    
      //cuando el estado de la autenticacion cambia esto se dispara
      onAuthStateChanged( FirebaseAuth, async( user ) =>{
        //Si no hay un usuario cierra sesion
        if ( !user ) return dispatch( logout() );
  
        //Si tengo un usuario se despacha el login
        const { uid, email, displayName, photoURL } = user; 
        dispatch( login({ uid, email, displayName, photoURL }) );
        //Se despacha la accion que inicia la carga de notas
        dispatch( startLoadingNotes() );
        
      })
    
    }, []);

    return status;

}
