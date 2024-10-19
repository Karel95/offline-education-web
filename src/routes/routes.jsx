//src/routes/routes.jsx
import { Home, ChatAI, SignIn, SignUp, Profile } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "chat-ai",
    path: "/chat-ai",
    element: <ChatAI />,
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
