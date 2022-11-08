import { AppRouter } from './router/AppRouter';
import { AppTheme } from './theme';

export const JournalApp = () => {
  return (
    //Aplica la configuracion del tema desde el punto mas alto de la aplicacion
    <AppTheme>
        {/* Aplica la configuracion del AppRouter */}
        <AppRouter />
    </AppTheme>
  )
}
