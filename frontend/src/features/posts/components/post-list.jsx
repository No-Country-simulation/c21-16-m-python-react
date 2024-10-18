import { Stack } from "react-bootstrap";
import { useGetPosts } from "../queries";
import { PostItem } from ".";

export const PostList = () => {
	const { data: posts, isPending, isError, error } = useGetPosts();

	return (
		<Stack gap={2} className="flex-wrap-reverse">
			<div>
				<h2>Logged-in user posts</h2>
			</div>

			{isPending ? (
				<div>
					<p>Loading...</p>
				</div>
			) : isError ? (
				<div>
					<p>
						Error: <pre>{JSON.stringify(error)}</pre>
					</p>
				</div>
			) : posts.length === 0 ? (
				<div>
					<p>No posts yet...</p>
				</div>
			) : (
				posts.map((post) => <PostItem key={post.id} post={post} />)
			)}
		</Stack>
	);
};
