import { useParams } from "react-router-dom";
import { PostList } from "./components/post-list";

export const Page = () => {
	const { username } = useParams();

	return (
		<section>
			<p>
				Welcome, <strong>{username}</strong>!
			</p>
			<hr
				style={{
					marginLeft: "-0.75rem",
					marginRight: "-0.75rem",
				}}
			></hr>
			<PostList />
		</section>
	);
};
