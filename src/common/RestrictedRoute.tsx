import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NAVIGATION_LINKS } from "./constants";

//eslint-disable-next-line
const RestrictedRoute = ({ children }:any) => {
	//eslint-disable-next-line
  const isUserLoggedIn = sessionStorage.getItem("token");

	const RedirectToLogin = (from:any) => {
		const navigate = useNavigate();
		useEffect(() => {
			navigate(NAVIGATION_LINKS.LOGIN, { state: { from } });
		}, []);
		return null;
	};

	if (!isUserLoggedIn) {
		console.log(window.location.pathname);
		return <RedirectToLogin from={window.location.pathname} />;
	}

	return children;
};

export default RestrictedRoute;
