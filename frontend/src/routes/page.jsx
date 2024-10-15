import { Link } from "react-router-dom";
import { useAuth, useGetProfile } from "@/features/auth";

export const Page = () => {
	const auth = useAuth();
	const profile = useGetProfile();

	return (
		<div>
			<Link
				style={{
					display: "block",
				}}
				to="/auth/login"
			>
				Login
			</Link>
			<Link
				style={{
					display: "block",
				}}
				to="/auth/register"
			>
				Register
			</Link>
			<pre>auth: {JSON.stringify(auth, null, 2)}</pre>
			<pre>profile: {JSON.stringify(profile.data, null, 2)}</pre>
		</div>
	);
};
