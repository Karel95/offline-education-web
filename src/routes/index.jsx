// src/routes/index.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Subjects from '../pages/subjects/index'; // Adjust as necessary
import routes from './routes';  // Array de rutas definido en routes.jsx


const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to a specific path or component */}
      {routes.map(({ path, element }, key) => 
        element && <Route key={key} exact path={path} element={element} />
      )}

      {/* Redirigir a /home si la ruta no existe */}
      <Route path="*" element={<Navigate to="/home" replace />} />
      
      {/* Define your subjects routes */}
      <Route path="/subjects/*" element={<Subjects />} />
      
    </Routes>
  );
};

export default AppRoutes;
