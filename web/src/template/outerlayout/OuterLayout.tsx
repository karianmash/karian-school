import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./OuterLayout.module.css";
import { useEffect } from "react";

const OuterLayout = () => {
	const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
	const navigate = useNavigate();

	useEffect(() => {
		middleware();
	}, []);

	const middleware = async () => {
		let userRole = loggedUser.role;
		if (userRole == 'admin') {
			navigate('/admin');
		} else if (userRole == 'school') {
			navigate('school');
		} else if (userRole == 'business') {
			navigate('/business')
		} else if (userRole == 'student') {
			navigate('/student');
		} else {
			localStorage.clear();
			navigate('/login');
		}
	}
	return (
		<div className={styles.container}>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default OuterLayout;
