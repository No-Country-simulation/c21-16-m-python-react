import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import * as Home from "./routes";
import * as Signin from "./routes/auth/signin";
import * as Signup from "./routes/auth/signup";

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);

  return <div>Dang!</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home.Page />,
    errorElement: <ErrorBoundary />,
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
