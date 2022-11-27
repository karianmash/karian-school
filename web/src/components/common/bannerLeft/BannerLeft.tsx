import React from "react";
import styles from "./BannerLeft.module.css";

const BannerLeft = () => {
	return (
		<div className={styles.banner}>
			<div className={styles.bannerContent}>
				<h1 className={styles.title}>Contact Us</h1>
			</div>
		</div>
	);
};

export default BannerLeft;
