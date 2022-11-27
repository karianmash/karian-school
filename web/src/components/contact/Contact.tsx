import React from "react";
import styles from "./Contact.module.css";

const Contact = () => {
	return (
		<>
			<div className={styles.banner}>
				<div className={styles.bannerContent}>
					<h1 className={styles.title}>Contact Us</h1>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.content}>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit,
						sed do eiusmod tempor incididunt ut labore et dolore
						magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea
						commodo consequat.
					</p>
					<div className={styles.formContainer}>
						<form>
							<div className={styles.field}>
								<label>First Name</label>
								<input
									type="text"
									name="fName"
									placeholder="Enter Your First Name"
								/>
							</div>
							<div className={styles.field}>
								<label>Last Name</label>
								<input
									type="text"
									name="LName"
									placeholder="Enter Your Last Name"
								/>
							</div>
							<div className={styles.field}>
								<label>Phone Number</label>
								<input
									type="tel"
									name="phone"
									placeholder="Enter Your Phone Number"
								/>
							</div>
							<div className={styles.field}>
								<label>Phone Number</label>
								<input
									type="email"
									name="email"
									placeholder="Enter Your Email ID"
								/>
							</div>
							<div className={`${styles.field} ${styles.full}`}>
								<label>Phone Number</label>
								<textarea
									name="query"
									placeholder="Query"
								></textarea>
							</div>
							<div className={`${styles.field} ${styles.full}`}>
								<button type="submit">Submit</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Contact;
