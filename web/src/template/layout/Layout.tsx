import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import styles from "./Layout.module.css";

export default function Layout() {
	return (
		<div>
			<div className={styles.header}>
				<Header />
			</div>
			<div className={styles.bodyWrapper}>
				<Outlet />
			</div>
			<div className={styles.footer}>
				<Footer />
			</div>
		</div>
	);
}
