import { Image, Placeholder, Stack } from "react-bootstrap";
import { useGetUserById } from "@/features/users";

export const PostUserProfile = ({ post }) => {
	const { data: author, isPending, isError } = useGetUserById(post.id_user);

	return isPending ? (
		<div className="d-flex align-items-center gap-2">
			<Placeholder
				style={{
					width: "36px",
					height: "36px",
					borderRadius: "50%",
				}}
			/>
			<Stack gap={1}>
				<Placeholder xs={4} />
				<Placeholder xs={2} />
			</Stack>
		</div>
	) : isError ? (
		<div className="fs-6 text-muted">
			<p className="m-0">Could not load author information.</p>
		</div>
	) : (
		<Stack
			as="a"
			href={author.username}
			direction="horizontal"
			gap={2}
			className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
		>
			{author.images ? (
				<Image
					src={author.images}
					roundedCircle
					style={{
						width: "36px",
						height: "36px",
					}}
				/>
			) : (
				<div
					className="bg-secondary rounded-circle"
					style={{
						width: "36px",
						height: "36px",
					}}
				/>
			)}
			<Stack>
				<strong className="lh-1 link-underline-opacity-0">{author.username}</strong>
				<p className="text-secondary m-0 link-underline-opacity-0">@{author.username}</p>
			</Stack>
		</Stack>
	);
};
