import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { JournalApp } from './JournalApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  //Activa el modo estricto para desarrollo
  <React.StrictMode>
    {/* Establece la ruta desde el punto mas alto de la aplicacion */}
    <BrowserRouter>
        {/* Carga el journal app */}
        <JournalApp />  
    </BrowserRouter> 
  </React.StrictMode>
)
