import React from "react";
import styles from "./Banner.module.css";

const Banner = () => {
	return (
		<div className={styles.banner}>
			<div className={styles.bannerContent}>
				<h1 className={styles.title}>
					Welcome to <br />
					Mercedo Escholar
				</h1>
				<p>
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
					sed do eiusmod tempor incididunt ut labore et dolore magna
					aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</p>
				<button>Learn More</button>
			</div>
		</div>
	);
};

export default Banner;
