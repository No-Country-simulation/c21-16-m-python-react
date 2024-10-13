import { createBrowserRouter, RouterProvider } from "react-router-dom";
import * as Home from "./routes";
import * as Signin from "./routes/auth/signin";
import * as Signup from "./routes/auth/signup";
import { RedirectAuthenticated } from "./shared/components";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home.Page />,
	},
	{
		path: "/auth/signin",
		element: (
			<RedirectAuthenticated>
				<Signin.Page />
			</RedirectAuthenticated>
		),
	},
	{
		path: "/auth/signup",
		element: (
			<RedirectAuthenticated>
				<Signup.Page />
			</RedirectAuthenticated>
		),
	},
]);

export const Routes = () => {
	return <RouterProvider router={router} />;
};
