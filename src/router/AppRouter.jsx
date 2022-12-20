import {Navigate, Route, Routes} from 'react-router-dom'
import { AuthRoutes } from '../auth/routes/AuthRoutes';

import { JournalRoutes } from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui/';
import { useCheckAuth } from '../hooks';



export const AppRouter = () => {

  //Destructura status del custom hook que verifica que estemos logeados
  const status = useCheckAuth();

  // Si status es checking mostramos la barra de carga 
  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

        {
          ( status === 'authenticated' )
            /*Login y Registro*/
          ? <Route path="/*" element={ <JournalRoutes/> }  />
            /*Journal App*/
          : <Route path="/auth/*" element={ <AuthRoutes/> }  />
            
          
        }
        
        {/* Ruta por defecto */}
        <Route path='/*' element={ <Navigate to='/auth/login' /> } />
        
    </Routes>
  )
}
