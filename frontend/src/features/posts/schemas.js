import { mixed, object, string } from "yup";

const content = string().label("Content").min(1).required().default("");

export const postSchema = object({
	content,
	files: mixed()
		.label("Files")
		.test("valid-type", "Invalid file type", (files) => {
			const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

			return Array.from(files).every((file) => SUPPORTED_FORMATS.includes(file.type));
		})
		.test("valid-size", "File too large", (files) => {
			const MAX_SIZE = 1024 * 1024 * 2; // 2MB

			return Array.from(files).every((file) => file.size <= MAX_SIZE);
		})
		.default([]),
});

export const postInitialValues = postSchema.getDefault();
