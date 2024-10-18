import { PostCreate, PostList } from "@/features/posts";

export const Page = () => {
	return (
		<main>
			<PostCreate />
			<PostList />
		</main>
	);
};
