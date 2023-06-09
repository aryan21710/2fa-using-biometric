import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResponsiveNavBar from "./common/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import { NAVIGATION_LINKS } from "./common/constants";
import RestrictedRoute from "./common/RestrictedRoute";

const AppRoutes = () => {
	const [isUserLoggedIn, setIsUserLoggedIn] = useState(
		sessionStorage.getItem("token") ?? false
	);

	const { LOGIN, HOME, SIGNUP } = NAVIGATION_LINKS;

	return (
		<>
			<Router>
				<ResponsiveNavBar
					setIsUserLoggedIn={setIsUserLoggedIn}
					isUserLoggedIn={isUserLoggedIn}
				/>
				<Routes>
					<Route
						path={LOGIN}
						element={<Login setIsUserLoggedIn={setIsUserLoggedIn} />}
					/>
					<Route path={SIGNUP} element={<Signup />} />
					<Route
						path={HOME}
						element={
							<RestrictedRoute>
								<Home />
							</RestrictedRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default AppRoutes;
