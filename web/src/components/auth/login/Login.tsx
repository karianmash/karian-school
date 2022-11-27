import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Auth.module.css";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [userMessage, setUserMessage] = useState('');
	const handleEmail = (event: any) => {
		setEmail(event.target.value)

	}
	const HandlePassword = (event: any) => {
		setPassword(event.target.value)
	}
	const handleSubmit = async (e: any) => {
		e.preventDefault()

		const data = {
			email: email,
			password: password
		}
		let result = await axios.post('http://localhost:8000/api/auth/login', data);
		if (result.status == 200) {
			setUserMessage('Login success')
			const access_token = result.data.token;
			let loggeduser = await axios.get('http://localhost:8000/api/user', {
				headers: {
					'Authorization': `Bearer ${access_token}`,
				},
			});
			if (loggeduser.status == 200) {
				if (typeof Storage !== 'undefined') {
					localStorage.setItem('user', JSON.stringify(loggeduser.data));
				}
				setTimeout(() => {
					//redirect user
					const role = loggeduser.data.role;
					if (role == 'student') {
						navigate('/product');
					} else if (role == 'admin') {
						navigate('/admin')
					} else if (role == 'business') {
						navigate('/business')
					} else {
						navigate('/school');
					}
				}, 2000);
			}
		} else {
			setUserMessage('Invalid credentials');
			setTimeout(() => {
				setUserMessage('');
			}, 3000);
		}
	}

	// console.log("email is:>>>", email, password)
	return (
		<div className={styles.flexContainer}>
			<div className={styles.wrapper}>
				<h2 className={styles.title}>Login</h2>
				<h4 style={{ padding: '10px 0px 10px 0px' }}>{userMessage}</h4>
				<form onSubmit={handleSubmit}>
					<input
						type="email"
						name="eMail"
						value={email}
						placeholder="Enter Your Mail Id"
						onChange={handleEmail}
					/>
					<input
						type="password"
						name="password"
						value={password}
						onChange={HandlePassword}
						placeholder="Enter Your Password"
					/>
					<div className={styles.linkContainer}>
						<Link
							className={styles.forgotLink}
							to="/forgot-password"
						>
							Forget Password?
						</Link>
						<Link className={styles.forgotLink} to="/signup">
							Create an account
						</Link>
					</div>
					<div className={styles.btnWrapper}>
						<button
							//onClick={() => navigate("/about")}
							type="submit"

						>
							Login
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
