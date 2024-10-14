//src/routes/routes.jsx
import { Home, ChatAI, SignIn, SignUp } from "@/pages";

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
    name: "Docs",
    href: "docs",
    target: "_blank",
    element: "",
  },
];

export default routes;
