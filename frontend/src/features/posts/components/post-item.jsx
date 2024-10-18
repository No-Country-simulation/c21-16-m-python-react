import { Card, CardHeader, Image } from "react-bootstrap";

export const PostItem = ({ post }) => {
	return (
		<Card key={post.id}>
			<CardHeader className="d-flex gap-2 align-items-center">
				<Image
					src="https://avatars.githubusercontent.com/u/55491792?v=4&size=64"
					roundedCircle
					style={{
						width: "36px",
						height: "36px",
					}}
				/>
				<div className="d-flex flex-column lh-sm">
					<strong>Carlos Ayala</strong>
					<p className="text-secondary mb-0 lh-1">@Legger</p>
				</div>
			</CardHeader>
			<Card.Body>
				<Card.Text>{post.content}</Card.Text>
			</Card.Body>
		</Card>
	);
};
