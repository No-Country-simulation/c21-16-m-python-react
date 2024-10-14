import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { signupInitialValues, signupSchema, useSignup } from "@/features/auth";

export const Page = () => {
	const navigate = useNavigate();
	const { mutate, isPending } = useSignup();

	const formik = useFormik({
		initialValues: signupInitialValues,
		validationSchema: signupSchema,
		onSubmit: (values) => {
			mutate(values, {
				onSuccess() {
					navigate("/auth/signin");
				},
			});
		},
	});

	return (
		<Container>
			<Row>
				<Col>
					<div className="mb-4">
						<h1>Signup</h1>
						<p>Enter your information to create an account.</p>
					</div>

					<Form onSubmit={formik.handleSubmit} noValidate className="d-grid gap-2">
						<Row>
							<Col>
								<Form.Group controlId="username">
									<Form.Label>Username</Form.Label>
									<Form.Control
										{...formik.getFieldProps("username")}
										isInvalid={formik.touched.username && formik.errors.username}
									/>
									<Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="first_name">
									<Form.Label>First Name</Form.Label>
									<Form.Control
										{...formik.getFieldProps("first_name")}
										isInvalid={formik.touched.first_name && formik.errors.first_name}
									/>
									<Form.Control.Feedback type="invalid">{formik.errors.first_name}</Form.Control.Feedback>
								</Form.Group>
							</Col>
							<Col>
								<Form.Group controlId="last_name">
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										{...formik.getFieldProps("last_name")}
										isInvalid={formik.touched.last_name && formik.errors.last_name}
									/>
									<Form.Control.Feedback type="invalid">{formik.errors.last_name}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="email">
									<Form.Label>Email</Form.Label>
									<Form.Control
										{...formik.getFieldProps("email")}
										isInvalid={formik.touched.email && formik.errors.email}
									/>

									<Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="password">
									<Form.Label>Password</Form.Label>
									<Form.Control
										{...formik.getFieldProps("password")}
										type="password"
										isInvalid={formik.touched.password && formik.errors.password}
									/>

									<Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Group controlId="password2">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										{...formik.getFieldProps("password2")}
										type="password"
										isInvalid={formik.touched.password2 && formik.errors.password2}
									/>

									<Form.Control.Feedback type="invalid">{formik.errors.password2}</Form.Control.Feedback>
								</Form.Group>
							</Col>
						</Row>

						<div className="d-grid mt-2">
							<Button type="submit" size="lg" disabled={isPending}>
								Signup
							</Button>
						</div>
					</Form>

					<div className="mt-2">
						<p>
							Already have an account? <Link to="/auth/signin">Signin</Link>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
