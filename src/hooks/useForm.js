import { useState, useEffect, useMemo } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState({});

    //Se dispara cada vez que el formState cambia
    useEffect(() => {
      
        createValidators();

    }, [ formState ]);

    //Si el formulario inicial cambia
    //Aplica cuando el form cambia fuera de este hook
    useEffect(() => {
        
        //Vuelve a actualizar el initial form
        setFormState( initialForm );
    
    }, [initialForm])
    

    //Se ejecuta si cambia el formState
    const isFormValid = useMemo( () => {
        
        //Recorre las llaves del formValue para preguntar si tiene alguna propiedad null
        for (const formValue of Object.keys( formValidation )) {
            //Si la propiedad formValue (email, password, etc)
            if( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ]);
    

    /*
        Actualiza el estado de cada uno de los campos del form,
        con computed property inserta los nuevos caracteres
        escritos por el usuario en el campo donde se este
        capturando.
    */
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    //Limpia el form, lo regresa a su estado incial
    const onResetForm = () => {
        setFormState( initialForm );
    }

    /*
        Funcion para saber si los campos capturados
        por el usuario esta correctamente escritos.
    */
    const createValidators = () => {
        
        const formCheckValues = {};

        //Recorre todas las llaves del formValidations
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[ formField ];

            /*
                Esto funciona como una comp property
                Lo que esta haciendo es concatenar a formField el String 'Valid'
                quedando 'emailValid' como ejemplo.

                Despues pregunta a la propiedad formField si tiene algun campo null
                si lo tiene entonces regresa mensaje de error.
            */
            formCheckValues[`${ formField }Valid`] = fn( formState[ formField ] ) ? null : errorMessage;
        }

        //Guarda los 'estados' del formulario en el useState para saber si estan con error o estan bien
        setFormValidation( formCheckValues );
    }

    return {
        //Regresamos todas las props del formState
        ...formState,
        //Se regresa las funciones relacionados con el formState
        formState,
        onInputChange,
        onResetForm,

        //Se regresa todas las props de formValidation
        ...formValidation,
        //Se regresan las funciones relacionadas al isFormValid
        isFormValid
        
    }
}