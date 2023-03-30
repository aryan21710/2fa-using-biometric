import React from "react";
import Button from "@mui/material/Button";
import { useNavigate, NavLink } from "react-router-dom";
import uuid from "react-uuid";
import { NAVIGATION_LINKS } from "../constants";
import "./Navbarlink.css";

// eslint-disable-next-line
interface IProps {
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<string | boolean>>;
  links: {
    name: string;
    url: string;
  }[];
}
const Navbarlink: React.FC<IProps> = ({ setIsUserLoggedIn, links }) => {
	const navigate = useNavigate();
	// eslint-disable-next-line
  const updatedLinks = links.map((link) => {
		if (link.name === "LOGOUT") {
			return (
				<Button
					key={uuid()}
					data-test={"LOGOUT"}
					className="logout"
					onClick={() => {
						sessionStorage.clear();
						setIsUserLoggedIn(false);
						navigate(NAVIGATION_LINKS.LOGIN);
					}}
				>
					{link.name}
				</Button>
			);
		} else {
			return (
				<NavLink
					data-test={link.name.toUpperCase()}
					key={uuid()}
					className={({ isActive }) => (isActive ? "activeLink" : "navbarLink")}
					to={link.url}
				>
					{link.name}
				</NavLink>
			);
		}
	});

	return <>{updatedLinks.map((link) => link)}</>;
};

export default Navbarlink;
