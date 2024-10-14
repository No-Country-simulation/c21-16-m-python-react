import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { signinInitialValues, signinSchema, useSignin } from "@/features/auth";

export const Page = () => {
	const navigate = useNavigate();

	const { mutate, isPending } = useSignin();

	const formik = useFormik({
		initialValues: signinInitialValues,
		validationSchema: signinSchema,
		onSubmit: (values) => {
			mutate(values, {
				onSuccess() {
					navigate("/");
				},
			});
		},
	});

	return (
		<Container>
			<Row>
				<Col>
					<div className="mb-4">
						<h1>Signin</h1>
						<p>Enter your email bellow to login to your account.</p>
					</div>

					<Form onSubmit={formik.handleSubmit} noValidate className="d-grid gap-2">
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

						<div className="d-grid mt-2">
							<Button type="submit" size="lg" disabled={isPending}>
								Signin
							</Button>
						</div>
					</Form>

					<div className="mt-2">
						<p>
							Already have an account? <Link to="/auth/signup">Signup</Link>
						</p>
					</div>
				</Col>
			</Row>
		</Container>
	);
};
