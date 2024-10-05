// src/pages/subjects/index.jsx

import React from 'react';
import subjectRoutes from './routes'; // Ensure the path is correct
import { Routes, Route } from 'react-router-dom';

const Subjects = () => {
  return (
    <div>
      {/* You can render links or navigation to MathematicsPage, ELAPage, etc. */}
      <Routes>
        {subjectRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.component />} />
        ))}
      </Routes>
    </div>
  );
};

export default Subjects;
