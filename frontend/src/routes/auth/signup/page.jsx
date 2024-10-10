import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {
  signupInitialValues,
  signupSchema,
  useSignup,
} from "../../../features/auth";

export const Page = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useSignup();

  const formik = useFormik({
    initialValues: signupInitialValues,
    validationSchema: signupSchema,
    onSubmit: (values, { setSubmitting }) => {
      mutate(values, {
        onSuccess() {
          navigate("/auth/signin");
        },
        onSettled() {
          setSubmitting(false);
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

          <Form
            onSubmit={formik.handleSubmit}
            noValidate
            className="d-grid gap-2"
          >
            <Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    {...formik.getFieldProps("firstName")}
                    isInvalid={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    {...formik.getFieldProps("lastName")}
                    isInvalid={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
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

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
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
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />

                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
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
