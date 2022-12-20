import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';




// Functional component que crear un formulario para el login de usuarios
export const LoginPage = () => {


  //Tomamos los datos de nuestro store
  const { status, errorMessage } = useSelector( state => state.auth );


  // usamos dispatch para poder ejecutar los thunks y los reducers
  const dispatch = useDispatch();



  //Llamamos el custom hook 'useForm'
  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });



  /*
    Memoriza el resultado del status
    Si el status cambia se vuelve a memorizar,
    si no, no se vuelve a ejecutar el memo.
    Si status === 'checking' regresa un
    valor booleano.
  */
  const isAuthenticating = useMemo( () => status === 'checking', [status] );

  
  
  //Despachamos la accion al thunk para hacer login con correo y contrasenia
  const onSubmit = ( event ) => {
    //evitamos que se haga un full reload
    event.preventDefault();  
    //Despachamos la accion al thunk
    dispatch( startLoginWithEmailPassword( { email, password } ) );
  };

  
  
  //Despachamos la accion al thunk, para inciar sesion con Google
  const onGoogleSignIn = () => { 
    console.log('onGoogleSignIn');
    dispatch( startGoogleSignIn() );
  };


  //HTML
  return (

    <AuthLayout title="Login">
      <form 
        onSubmit={ onSubmit }
        className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="correo@google.com" 
              fullWidth
              name="email"
              value={ email }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid item xs={ 12 } sx={{ mt: 2 }}>
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="Contraseña" 
              fullWidth
              name="password"
              value={ password }
              onChange={ onInputChange }
            />
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }>

              <Button 
                disabled={ isAuthenticating }
                type="submit" 
                variant="contained" 
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                disabled={ isAuthenticating }
                variant="contained" 
                fullWidth
                onClick={ onGoogleSignIn }
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid> 

          <Grid 
                item xs={ 12 }
                display={ !!errorMessage ? '' : 'none' }
              >
                <Alert severity='error'>{ errorMessage }</Alert>
              </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={ RouterLink } color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>

        </Grid>
      </form>

    </AuthLayout>      
     
  )
}
