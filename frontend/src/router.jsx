import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Home from "./routes";
import * as Login from "./routes/auth/login";
import * as Register from "./routes/auth/register";
import { RedirectAuthenticated } from "./shared/components";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home.Page />,
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
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
