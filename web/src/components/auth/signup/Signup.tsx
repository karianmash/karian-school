import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";

const Signup = () => {
	const [fname, setfname] = useState('');
	const [lname, setlname] = useState('');
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [passwordConf, setpasswordconf] = useState('');
	const [userRole, setUserRole] = useState('');
	const [userMessage, setUserMessage] = useState('');
	const navigate = useNavigate();
	const signUp = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		const info = {
			fname: fname,
			lname: lname,
			role: userRole,
			email: email,
			password: password,
			'password_confirmation': passwordConf
		};
		const register = await axios.post('http://localhost:8000/api/auth/register', info);
		if (register.status == 200) {
			setUserMessage(register.data.message + ' redirecting...');
			setfname('')
			setlname('')
			setemail('')
			setpassword('')
			setpasswordconf('')
			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} else {
			// console.log(register);
		}

	}
	return (
		<div className={styles.flexContainer}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Signup</h2>
				<h4 style={{ marginBottom: '3px' }}>{userMessage}</h4>
				<form onSubmit={signUp}>
					<select name="role" defaultValue={userRole} onChange={(e) => { setUserRole(e.target.value) }} id="role" style={{ padding: '10px', borderRadius: '5px' }}>
						<option value="0" disabled selected>Choose role</option>
						<option value="student">Student</option>
						<option value="business">Business</option>
						<option value="school">School</option>
						<option value="admin">Admin</option>
					</select>
					<input
						type="text"
						name="fName"
						placeholder="Enter Your First Name"
						value={fname}
						onChange={(e) => { setfname(e.target.value) }}
					/>
					<input
						type="text"
						name="LName"
						placeholder="Enter Your Last Name"
						value={lname}
						onChange={(e) => { setlname(e.target.value) }}
					/>
					<input
						type="email"
						name="eMail"
						placeholder="Enter Your Email Id"
						value={email}
						onChange={(e) => { setemail(e.target.value) }}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Enter Your Passoword"
						required
						value={password}
						onChange={(e) => { setpassword(e.target.value) }}
					/>
					<input
						type="password"
						name="password-confirmed"
						placeholder="Confirm Your Passoword"
						required
						value={passwordConf}
						onChange={(e) => { setpasswordconf(e.target.value) }}
					/>
					<div className={styles.linkContainer}>
						<Link
							className={styles.forgotLink}
							to="/forgot-password"
						>
							Forget Password?
						</Link>
						<Link className={styles.forgotLink} to="/login">
							Already have an account?
						</Link>
					</div>
					<div className={styles.btnWrapper}>
						<button type="submit">Signup</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
