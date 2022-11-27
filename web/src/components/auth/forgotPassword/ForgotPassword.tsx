import React from "react";
import { Link } from "react-router-dom";
import styles from "../Auth.module.css";

const ForgotPassoword = () => {
	return (
		<div className={styles.flexContainer}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Forgot Password</h2>
				<form>
					<input
						type="email"
						name="eMail"
						placeholder="Enter Your Mail Id"
					/>
					<div className={styles.linkContainer}>
						<Link className={styles.forgotLink} to="/login">
							Already hava an account?
						</Link>
						<Link className={styles.forgotLink} to="/signup">
							Create an Account
						</Link>
					</div>
					<div className={styles.btnWrapper}>
						<button type="submit">Reset</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default ForgotPassoword;
