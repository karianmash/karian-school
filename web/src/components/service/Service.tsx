import React from "react";
import BannerLeft from "../common/bannerLeft/BannerLeft";
import styles from "./Service.module.css";
import banner from "../../images/banner.jpg";

const Service = () => {
	return (
		<>
			<div className={styles.banner}>
				<div className={styles.bannerContent}>
					<h1 className={styles.title}>Service</h1>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.cardContainer}>
					<div className={styles.card}>
						<div className={styles.cardBanner}>
							<img src={banner} alt="Banner" />
						</div>
						<div className={styles.cardContent}>
							<h3 className={styles.cardTitle}>
								Exchange Information with Your Peers
							</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat.
							</p>
						</div>
					</div>
					<div className={styles.card}>
						<div className={styles.cardBanner}>
							<img src={banner} alt="Banner" />
						</div>
						<div className={styles.cardContent}>
							<h3 className={styles.cardTitle}>
								Checkout the clubs on the campus
							</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat.
							</p>
						</div>
					</div>
					<div className={styles.card}>
						<div className={styles.cardBanner}>
							<img src={banner} alt="Banner" />
						</div>
						<div className={styles.cardContent}>
							<h3 className={styles.cardTitle}>
								Trade books and other things with your peers
							</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur
								adipiscing elit, sed do eiusmod tempor
								incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation
								ullamco laboris nisi ut aliquip ex ea commodo
								consequat.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Service;
