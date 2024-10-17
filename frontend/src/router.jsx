import {
  createBrowserRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

// import * as Home from "./routes";
import  * as Signin from "./routes/auth/signin";
import  * as Signup from "./routes/auth/signup";
import { Layout } from "./routes/components/layout/layout";
import { Home } from "./components/homepage/home";
import { Perfil } from "./components/perfil/perfil";

const ErrorBoundary = () => {
  let error = useRouteError();
  console.error(error);

  return <div>Dang!</div>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",  // Ruta principal (homepage)
        element: <Home/>,
      },
      {
        path: "/auth/signin",  // Página de inicio de sesión
        element: <Signin.Page />,
      },
      {
        path: "/auth/signup",  // Página de registro
        element: <Signup.Page />,
      },
      {
        path: "/perfil",  
        element: <Perfil/>,
      },
    ],
  },
]);

export const Routes = () => {
  return <RouterProvider router={router} />;
};
