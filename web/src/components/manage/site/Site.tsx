import React from "react";
import styles from "./Site.module.css";

const Site = () => {
	return (
		<>
			<div className={styles.banner}>
				<div className={styles.bannerContent}>
					<h1 className={styles.title}>Site</h1>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.btnWrapper}>
					<button>+ Add Site</button>
				</div>
				<div className={styles.clubWrapper}>
					<div className={styles.clubCard}>
						<h5>Starbucks</h5>
						<div className={styles.btnWrapper}>
							<button className={styles.exit}>Remove</button>
						</div>
					</div>
					<div className={styles.clubCard}>
						<h5>Chick-fil-A</h5>
						<div className={styles.btnWrapper}>
							<button className={styles.exit}>Remove</button>
						</div>
					</div>
					<div className={styles.clubCard}>
						<h5>Halal Street</h5>
						<div className={styles.btnWrapper}>
							<button className={styles.exit}>Remove</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Site;
