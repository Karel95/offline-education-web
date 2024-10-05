// adminRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import AdminDashboard from '../pages/AdminDashboard';
import AdminSettings from '../pages/AdminSettings';

const adminRoutes = [
  <Route key="admin-dashboard" path="/admin/dashboard" element={<AdminDashboard />} />,
  <Route key="admin-settings" path="/admin/settings" element={<AdminSettings />} />,
];

export default adminRoutes;
