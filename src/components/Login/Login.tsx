import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { Formik, Form, ErrorMessage } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
	RESTRICTED_ROUTES,
	UNATHORIZED,
	NAVIGATION_LINKS,
} from "../../common/constants";
import validationSchema from "./validationSchema";
import "./Login.css";

interface IProps {
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<string | boolean>>;
}

const initialValues = {
	username: "",
	password: "",
};

// eslint-disable-next-line
const Login: React.FC<IProps> = React.memo(({ setIsUserLoggedIn }) => {
	const { SIGNUP, HOME } = NAVIGATION_LINKS;
	const navigate = useNavigate();
	const location = useLocation();

	const redirectedFrom = location.state?.from?.from ?? "/";

	if (RESTRICTED_ROUTES.includes(redirectedFrom)) {
		toast.dismiss();
		toast.error(UNATHORIZED, {
			position: toast.POSITION.TOP_LEFT,
			theme: "dark",
			autoClose: 2000,
		});
	}

	const [response, setResponse] = useState({
		loading: false,
		error: null,
		message: null,
	});

	useEffect(() => {
		sessionStorage.clear();
	}, []);

	useEffect(() => {
		if (response?.error) {
			setIsUserLoggedIn(false);
			toast.dismiss();
			toast.error(response?.error, {
				position: toast.POSITION.TOP_LEFT,
				theme: "dark",
				autoClose: 2000,
			});
		}

		if (response?.message) {
			toast.dismiss();
			setIsUserLoggedIn(true);
			navigate(HOME);
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
				const handleChange = (event: any) => {
					const { name, value } = event.target;
					setFieldValue(name, value);
				};
				return (
					<>
						<Form>
							<Container maxWidth="sm" className="signInContainer">
								<Box
									sx={{
										flexGrow: 1,
										display: { xs: "flex", md: "flex" },
									}}
									className="login"
								>
									<LockOpenIcon className="signUpIcon" />
									<Typography variant="body1" className="text">
                    Sign in
									</Typography>

									<TextField
										className="input"
										data-test="emailaddress"
										required
										type="email"
										label="Email Address"
										name="username"
										onChange={handleChange}
										value={values.username}
									/>
									<ErrorMessage
										name="email"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<TextField
										className="input"
										required
										data-test="password"
										type="password"
										label="Password"
										name="password"
										onChange={handleChange}
										value={values.password}
									/>
									<ErrorMessage
										name="password"
										render={(msg) => <div className="error">{msg}</div>}
									/>
									<Button
										data-test="signinButton"
										className="button"
										variant="contained"
										type="submit"
										data-testid="login"
									>
                    SIGN IN
									</Button>
									<Typography variant="body1" className="signupLink">
                    Dont have an account?{" "}
										<Link data-test="dontHaveAnAccountSignup" to={SIGNUP}>
                      Signup
										</Link>
									</Typography>
									<Typography variant="body1" className="useBiometrics">
                    Use Biometrics For Login
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
});

export default Login;
