import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Home from "./routes";
import * as Signin from "./routes/auth/signin";
import * as Signup from "./routes/auth/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home.Page />,
  },
  {
    path: "/auth/signin",
    element: <Signin.Page />,
  },
  {
    path: "/auth/signup",
    element: <Signup.Page />,
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
