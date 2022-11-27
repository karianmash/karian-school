import React from "react";
import Banner from "../common/banner/Banner";
import styles from "./About.module.css";

const About = () => {
	return (
		<>
			<Banner />
			<div className={styles.container}>
				<h2 className={styles.title}>About Us</h2>
				<div className={styles.content}>
					<p>
						This webapplication is mainly use by student.This
						platform provides such functionality which is useful for
						student like they can order old and new product.They can
						create or Join the club or post.Also there are three
						more roles apart from student Business Owner, School
						admin and super admin.where business owner can create or
						edit the promotion of their store.School admin manage
						all students activity and super admin have all of the
						access to create any profile.{" "}
					</p>
				</div>
			</div>
		</>
	);
};

export default About;
