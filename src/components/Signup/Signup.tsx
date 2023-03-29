import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import {
	NAVIGATION_LINKS,
	FOOTER,
} from "../../common/constants";
import validationSchema from "./validationSchema";
import "./Signup.css";

const initialValues = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
	contactNumber: "",
};

const Signup = () => {
	const { LOGIN } = NAVIGATION_LINKS;

	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	useEffect(() => {
		if (response?.error) {
			toast.dismiss();
			toast.error(response?.error, {
				position: toast.POSITION.TOP_LEFT,
				theme: "dark",
				autoClose: 2000,
			});
		}

		if (response?.message) {
			toast.dismiss();
			toast.success(response?.message, {
				position: toast.POSITION.TOP_LEFT,
				theme: "dark",
				autoClose: 2000,
			});
		}
	}, [response]);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			{({ values, setFieldValue }) => {
				const handleChange = (event:any) => {
					const { name, value } = event.target;
					setFieldValue(name, value);
				};

				return (
					<>
						<Form>
							<Container maxWidth="sm" className="signUpContainer">
								<Box
									sx={{
										flexGrow: 1,
										display: { xs: "flex", md: "flex" },
									}}
									className="signUp"
								>
									<LockOpenIcon className="signUpIcon" />
									<Typography variant="body1" className="text">
                    Sign up
									</Typography>
									<TextField
										className="input"
										required
										data-test="firstName"
										label="First Name"
										onChange={handleChange}
										name="firstName"
										value={values.firstName}
									/>
									<ErrorMessage
										name="firstName"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										label="Last Name"
										name="lastName"
										data-test="lastName"
										onChange={handleChange}
										value={values.lastName}
									/>
									<ErrorMessage
										name="lastName"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="email"
										label="Email Address"
										name="email"
										data-test="email"
										onChange={handleChange}
										value={values.email}
									/>
									<ErrorMessage
										name="email"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="password"
										label="Password"
										name="password"
										data-test="signupPassword"
										onChange={handleChange}
										value={values.password}
									/>
									<ErrorMessage
										name="password"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="password"
										label="Confirm Password"
										name="confirmPassword"
										data-test="confirmPassword"
										onChange={handleChange}
										value={values.confirmPassword}
									/>
									<ErrorMessage
										name="confirmPassword"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										type="number"
										label="Contact Number"
										name="contactNumber"
										data-test="contactNumber"
										onChange={handleChange}
										value={values.contactNumber}
									/>
									<ErrorMessage
										name="contactNumber"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<Button data-test="signupButton" className="button" variant="contained" type="submit">
                    SIGN UP
									</Button>
									<Typography variant="body1" data-test="alreadyHaveAnAccount" className="signupLink">
                    Already have an account? <Link to={LOGIN}>Signin</Link>
									</Typography>
									<Typography variant="body1" className="loginFooter">
										{FOOTER}
									</Typography>
								</Box>
							</Container>
						</Form>
						<ToastContainer limit={1} />
					</>
				);
			}}
		</Formik>
	);
};

export default Signup;
