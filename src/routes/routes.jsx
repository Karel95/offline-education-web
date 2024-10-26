//src/routes/routes.jsx
import { Home, AiOffline, SignIn, SignUp, Profile } from "@/pages";

export const routes = [
  {
    name: "Home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Ai-Offline",
    path: "/ai-offline",
    element: <AiOffline />,
  },
  {
    name: "Sign In",
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    name: "Sign Up",
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    name: "Profile",
    path: "/profile",
    element: <Profile />,
  },
];

export default routes;
