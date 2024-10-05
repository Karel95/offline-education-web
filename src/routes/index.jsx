// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import routes from './routes';  // Array de rutas definido en routes.jsx

function AppRoutes() {
  return (
    <Routes>
      {routes.map(({ path, element }, key) => 
        element && <Route key={key} exact path={path} element={element} />
      )}

      {/* Redirigir a /home si la ruta no existe */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default AppRoutes;
