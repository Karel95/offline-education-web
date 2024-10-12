import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '@/widgets/layout';
import AppRoutes from './routes';  // Importa el archivo de enrutamiento principal
import routes from './routes/routes';  // Importa las rutas que estás usando en AppRoutes

function App() {
  const { pathname } = useLocation();

  // Define la función handleUpdate aquí
  const handleUpdate = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.update(); // Fuerza una actualización del SW
      window.location.reload(); // Recarga la página para aplicar la actualización
    }
  };

  return (
    <>
      {/* Mostrar Navbar si no estamos en /sign-in o /sign-up */}
      {!(pathname === '/sign-in' || pathname === '/sign-up') && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )}

      {/* Renderizas las rutas definidas en AppRoutes */}
      <AppRoutes />
    </>
  );
}

export default App;
