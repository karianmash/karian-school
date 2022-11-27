import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Chat.module.css";
import socketIO from 'socket.io-client';

const Chat = () => {
	const { user } = useParams();
	const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
	const baseUrl = 'http://localhost:8000/api/';
	const [otherUser, setOther] = useState('');
	const [message, setMessage] = useState('');
	const [username, setUsername] = useState('');
	const [users, setUsers] = useState<any[]>([]);
	useEffect(() => {
		GetUsers();
		socketFunction();
	}, []);

	const GetUsers = async () => {
		const users = await axios.get(baseUrl + 'chat/' + parseInt(loggedUser.id));
		if (users.status == 200) {
			setUsers(users.data.users);
		}
	}

	const sendMessage = async (e: any) => {
		e.preventDefault();
		const data = {
			receiver: parseInt(otherUser),
			sender: parseInt(loggedUser.id),
			message: message,
			group_id: (parseInt(otherUser) + parseInt(loggedUser.id)),
		};

		console.log(data);
		// const messages = await axios.get(baseUrl + 'messages' + group_id);
	}

	const getMessages = async (e: any) => {
		e.preventDefault();
		let receiverID = e.target.getAttribute('receiver-id');
		console.log(receiverID);
		setOther(receiverID);

	}
	const socketFunction = async () => {
		const socket = socketIO('http://localhost:3000', { query: { user_id: parseInt(loggedUser.id) } });
		socket.on('user_connected', function (data) {
			let myContainer: HTMLDivElement | null = document.querySelector(`#status_${data}`);
			if (myContainer instanceof HTMLDivElement) {
				myContainer.innerHTML = '<span style={{fontSize:"10px"}}>Online</span>';
			}
		});

		socket.on('user_disconnected', function (data) {
			let myContainer: HTMLDivElement | null = document.querySelector(`#status_${data}`);
			if (myContainer instanceof HTMLDivElement) {
				myContainer.innerHTML = '<span style={{fontSize:"10px"}}>Offline</span>';
			}
		});
	}
	const usersList = users.map(user =>
		<li key={user.id} style={{ padding: '4px 0 4px 0' }}>
			<Link onClick={getMessages} receiver-id={user.id} style={{ textDecoration: 'none' }} to={'/chat/user/' + user.id}>
				<div receiver-id={user.id}>{user.first_name + ' ' + user.second_name}</div>
				<div style={{ fontSize: '10px' }} id={'status_' + user.id}><span style={{ fontSize: "10px" }}>Offline</span></div>
			</Link>
		</li>
	);
	return (
		<>
			<div className={styles.banner}>
				<div className={styles.bannerContent}>
					<h1 className={styles.title}>Chat</h1>
				</div>
			</div>
			<div style={{ display: 'flex', marginTop: '20px' }}>
				<div style={{ width: '240px' }}>
					<div style={{ marginLeft: '15px', borderRadius: '4px' }}>
						<ul style={{ listStyle: 'none' }}>
							{usersList}
						</ul>
					</div>
				</div>
				<div style={{ borderLeft: '1px solid gray', width: '80%', padding: '0 10px 0 0' }}>
					<div style={{ backgroundColor: 'gray' }}>
						<div style={{ padding: '5px', color: 'white' }}>User name</div>
					</div>
					<div className={styles.container}>
						<div className={styles.chatWrapper}>
							<div className={styles.receiver}>
								<p>Hello</p>
							</div>
							<div className={styles.sender}>
								<p>Hi</p>
							</div>
							<div className={styles.receiver}>
								<p>How are you</p>
							</div>
							<div className={styles.sender}>
								<p>I'm Fine Thank you</p>
							</div>
						</div>
					</div>
					<div className={styles.msgSendWrapper} style={{ marginBottom: '20px' }}>
						<input type="hidden" value={otherUser} />
						<input type="text" value={message} onChange={(e) => { setMessage(e.target.value) }} />
						<button onClick={sendMessage}>Send</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Chat;
