import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RedirectAuthenticated } from "./shared/components";
import { Layout } from "./routes/layout";
import * as Login from "./routes/auth/login";
import * as Register from "./routes/auth/register";
import { Home } from "./components/homepage/home";
import { Perfil } from "./components/perfil/perfil";
import { PostCreate } from "./features/posts";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: "/auth/login",
				element: (
					<RedirectAuthenticated>
						<Login.Page />
					</RedirectAuthenticated>
				),
			},
			{
				path: "/auth/register",
				element: (
					<RedirectAuthenticated>
						<Register.Page />
					</RedirectAuthenticated>
				),
			},
			{
				path: "/perfil",
				element: <Perfil />,
			},
		],
	},
	{
		path:"/publicaciones",
		element:<PostCreate/>
	}
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
