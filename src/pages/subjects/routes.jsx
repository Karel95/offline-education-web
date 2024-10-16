// src/pages/subjects/routes.jsx

import EnglishPage from './english';
import MathematicsPage from './mathematics';
import HistoryPage from './history';

const subjectRoutes = [
  { path: '/english', component: EnglishPage },
  { path: '/mathematics', component: MathematicsPage },
  { path: '/history', component: HistoryPage },
  // Add more routes here as needed, e.g., ELAPage
];

export default subjectRoutes;
