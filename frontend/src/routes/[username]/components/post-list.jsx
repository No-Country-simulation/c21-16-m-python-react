import { Stack } from "react-bootstrap";
import { PostItem, useGetUserPosts } from "@/features/posts";

export const PostList = () => {
	const { data: posts, isPending, isError } = useGetUserPosts();

	return isPending ? (
		<div>Loading...</div>
	) : isError ? (
		<div>Error</div>
	) : posts.length === 0 ? (
		<div>No posts yet.</div>
	) : (
		<Stack gap={2}>
			{posts.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
		</Stack>
	);
};
