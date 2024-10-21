import { useNavigate } from "react-router-dom";
import { Card, CardHeader, Col, Row } from "react-bootstrap";
import { PostGallery } from "./post-gallery";
import { PostOptions } from "./post-options";

export const PostItem = ({ post }) => {
	const navigate = useNavigate();

	const handleBody = (event) => {
		const targets = ["card-body", "card-text"];
		if (targets.some((target) => event.target.classList.contains(target))) {
			// navigate(`posts/${post.id}`);
			alert("#TODO: Navigate to post");
		}
	};

	return (
		<Card key={post.id}>
			{/* <CardHeader className="d-flex gap-2 align-items-center">
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
			</CardHeader> */}
			<CardHeader>
				<Row>
					<Col xs={10}>#TODO: Header - User</Col>
					<Col xs={2} className="text-end">
						<PostOptions post={post} />
					</Col>
				</Row>
			</CardHeader>
			<Card.Body role="button" onClick={handleBody}>
				<Card.Text>{post.content}</Card.Text>
				<PostGallery files={post.files_set} />
			</Card.Body>
			<Card.Footer>#TODO: Footer</Card.Footer>
		</Card>
	);
};
