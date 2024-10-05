// userRoutes.jsx
import React from 'react';
import { Route } from 'react-router-dom';
import UserProfile from '../pages/UserProfile';
import UserSettings from '../pages/UserSettings';

const userRoutes = [
  <Route key="user-profile" path="/user/profile" element={<UserProfile />} />,
  <Route key="user-settings" path="/user/settings" element={<UserSettings />} />,
];

export default userRoutes;
