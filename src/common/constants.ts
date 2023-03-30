import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:5000/api";

export const FOOTER = "Copyright @Moonfare 2023";

export const API_CONFIG = {
	method: "POST",
	mode: "cors", // no-cors, *cors, same-origin
	cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
	credentials: "same-origin", // include, *same-origin, omit
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Headers": "*",
	},
	redirect: "follow", // manual, *follow, error
	referrerPolicy: "no-referrer",
};

export const RESTRICTED_ROUTES = ["/home"];

export const LOGIN_SUCCESS = "User Signed In successfully";
export const LOGIN_ERROR = "Sign In Failed";
export const SIGNUP_SUCCESS = "Sign up Successfull";
export const SIGNUP_ERROR = "Sign up Failed";
export const UNATHORIZED = "Restricted Page. Please Sign In.";

export const TOASTIFY_CONFIG = {
	position: toast.POSITION.TOP_LEFT,
	theme: "dark",
	autoClose: 2000,
};

export const NAVIGATION_LINKS = {
	LOGIN: "/",
	HOME: "/home",
	SIGNUP: "/signup",
};
