import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/home";

const router = createBrowserRouter([
  {
    path: "login-operator",
    element: <Login />,
  },
  {
    path: "home-operator",
    element: <Home />,
  },
]);

export default router;
