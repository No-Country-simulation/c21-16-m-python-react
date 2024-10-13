import { Link } from "react-router-dom";
import { useAuth } from "../features/auth";

export const Page = () => {
	const auth = useAuth();

	return (
		<div>
			<Link
				style={{
					display: "block",
				}}
				to="/auth/signin"
			>
				Signin
			</Link>
			<Link
				style={{
					display: "block",
				}}
				to="/auth/signup"
			>
				Signup
			</Link>
			<pre>{JSON.stringify(auth, null, 2)}</pre>
		</div>
	);
};
