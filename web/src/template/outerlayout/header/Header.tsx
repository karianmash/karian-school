import React from "react";
import styles from "./Header.module.css";
import logo from "../../../images/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className={styles.fluid}>
			<div className={styles.logo}>
				<img src={logo} alt="Logo" />
			</div>
			<ul className={styles.headerLinks}>
				<li>
					<Link to="/login">Login</Link>
				</li>
				<li>Contact Us</li>
				<li>About Us</li>
			</ul>
		</div>
	);
};

export default Header;
