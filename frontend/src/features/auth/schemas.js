import { object, ref, string } from "yup";

const email = string().label("Email").email().required().default("");
const password = string().label("Password").min(8).required().default("");

export const signinSchema = object({
	email,
	password,
});

export const signinInitialValues = signinSchema.getDefault();

export const signupSchema = object({
	username: string().label("Username").required().default(""),
	first_name: string().label("First Name").required().default(""),
	last_name: string().label("Last Name").required().default(""),
	email,
	password,
	password2: string()
		.label("Confirm Password")
		.oneOf([ref("password")], "Passwords must match.")
		.required()
		.default(""),
});

export const signupInitialValues = signupSchema.getDefault();
