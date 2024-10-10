import { object, string } from "yup";

const email = string().label("Email").email().required().default("");
const password = string().label("Password").min(8).required().default("");

export const signinSchema = object({
  email,
  password,
});

export const signinInitialValues = signinSchema.getDefault();

export const signupSchema = object({
  firstName: string().label("First Name").required().default(""),
  lastName: string().label("Last Name").required().default(""),
  email,
  password,
});

export const signupInitialValues = signupSchema.getDefault();
