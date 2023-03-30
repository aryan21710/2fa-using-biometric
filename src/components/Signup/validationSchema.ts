import * as Yup from "yup";

const validationSchema = Yup.object({
	firstName: Yup.string()
		.max(20, "Must be 20 characters or less")
		.required("First Name is Required"),
	lastName: Yup.string()
		.max(20, "Must be 20 characters or less")
		.required("Last Name is Required"),
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string()
		.min(5, "Password Must be 5 characters or more")
		.required("Required"),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Required"),
});

export default validationSchema;
