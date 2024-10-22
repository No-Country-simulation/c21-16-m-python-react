import { Stack } from "react-bootstrap";
import { PostItem, PostSkeleton, useGetPosts } from "@/features/posts";

export const PostList = () => {
	const { data, isPending, isError } = useGetPosts();

	return isPending ? (
		<Stack as="section" gap={3}>
			{new Array(3).fill(0).map((_, index) => (
				<PostSkeleton key={index} />
			))}
		</Stack>
	) : isError ? (
		<section>Error</section>
	) : data.results.length === 0 ? (
		<section>No posts yet.</section>
	) : (
		<Stack as="section" gap={3}>
			{data.results.map((post) => (
				<PostItem key={post.id} post={post} />
			))}
			{/* TODO: when there are no more posts, display a message */}
			<div className="py-5 text-center text-secondary">
				<p>You are up to date.</p>
			</div>
		</Stack>
	);
};
