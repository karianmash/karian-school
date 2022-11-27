import React from "react";
import styles from "./Student.module.css";
import { Link, useNavigate } from "react-router-dom";

const Student = () => {
	const navigate = useNavigate();
	return (
		<>
			<div className={styles.banner}>
				<div className={styles.bannerContent}>
					<h1 className={styles.title}>Student</h1>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.btnWrapper}>
					<button
					onClick={() =>navigate("/addstudent")}
					type="submit">+ Add Student</button>
				</div>
				<div className={styles.clubWrapper}>
					<div className={styles.clubCard}>
						<h5>1001945782</h5>
						<div className={styles.btnWrapper}>
							<button className={styles.exit}>Remove</button>
						</div>
					</div>
					<div className={styles.clubCard}>
						<h5>1001875479</h5>
						<div className={styles.btnWrapper}>
							<button className={styles.exit}>Remove</button>
						</div>
					</div>
					<div className={styles.clubCard}>
						<h5>1001925158</h5>
						<div className={styles.btnWrapper}>
							<button className={styles.exit}>Remove</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Student;
