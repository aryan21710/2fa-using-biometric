import {
	BASE_URL,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	SIGNUP_SUCCESS,
	SIGNUP_ERROR,
} from "../common/constants";

interface ISignupCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  imageSrc: any;
}
interface IResponse {
  loading: boolean;
  error: any;
  message: string | null;
}

export const postSignup = async (
	userCredentials: ISignupCredentials,
	setResponse: React.Dispatch<React.SetStateAction<IResponse>>
) => {
	let response;
	let error;
	try {
		response = await fetch(`${BASE_URL}/auth/signup`, {
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
			body: JSON.stringify(userCredentials),
		});
		response = await response.json();
		if (response?.message.includes("Error")) {
			error = response.message;
		}
	} catch (err) {
		console.error(`err ${err}`);
		response = null;
	} finally {
		if (response && !response?.message.includes("Error")) {
			setResponse({
				loading: false,
				message: SIGNUP_SUCCESS,
				error: null,
			});
		} else {
			setResponse({
				loading: false,
				error: error ? error : SIGNUP_ERROR,
				message: null,
			});
		}
	}
};

interface ILoginCredentials {
  email: string;
  password: string;
}

export const submitLogin = (
	userCredentials: ILoginCredentials,
	setResponse: React.Dispatch<React.SetStateAction<IResponse>>
) => {
	const { email } = userCredentials;
	return async () => {
		let response: any;
		try {
			response = await fetch(`${BASE_URL}/auth/signin`, {
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
				body: JSON.stringify(userCredentials),
			});
			response = await response.json();
		} catch (err) {
			console.error(`err ${err}`);
		} finally {
			if (response && response?.token) {
				sessionStorage.setItem("token", response?.token);
				sessionStorage.setItem("email", email);
				setResponse({
					loading: false,
					error: null,
					message: LOGIN_SUCCESS,
				});
			} else {
				setResponse({
					loading: false,
					message: null,
					error: LOGIN_ERROR,
				});
			}
		}
	};
};
