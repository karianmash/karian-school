import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import item1 from "../../../images/Bed_Frame.webp";
import item2 from "../../../images/Instapot.jpeg";
import item3 from "../../../images/Mobile_Phone.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Cart = () => {
	const navigate = useNavigate();
	const url = 'http://localhost:8000/api/';
	const imageUrl = 'http://localhost:8000/uploads/';
	const [total, setTotalAmount] = useState(0);
	const [paymentMessage, setPayMess] = useState('');
	const transactionIDE = localStorage.getItem('transaction_id');
	const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
	const [pastOrders, setPast] = useState<any[]>([]);
	const [myCart, setMyCart] = useState<any[]>([]);

	useEffect(() => {
		getCart();
		completedOrders();
	}, []);

	const deletePastItem = async (e: any) => {
		e.preventDefault();
		let itemId = e.target.getAttribute('past-id');
		let createdDate = e.target.getAttribute('created-at');

		const deleteres = await axios.delete(url + 'order/' + itemId + '/' + createdDate);
		if (deleteres.status == 200) {
			completedOrders();
		} else {
			// console.log(deleteres);
		}
	}

	const deleteCartItem = async (e: any) => {
		e.preventDefault();
		let itemId = e.target.getAttribute('cart-id');
		let createdDate = e.target.getAttribute('created-at');
		const deleteres = await axios.delete(url + 'order/' + itemId + '/' + createdDate);
		if (deleteres.status == 200) {
			getCart();
			// console.log(deleteres.data);
		} else {
			// console.log(deleteres);
		}
	}

	const pastList = pastOrders.map(past =>
		<div className={styles.clubCard} key={past.id}>
			{past.product.map((product: { image: string; }) => <div> <img src={imageUrl + product.image} /> </div>)}
			{past.product.map((product: { name: string; }) => <h5>{product.name}</h5>)}
			{past.product.map((product: { price: string; }) => <h5>{"$ " + product.price}</h5>)}
			<div className={styles.btnWrapper}>
				<button className={styles.exit} type={'button'} created-at={past.created_at} past-id={past.id} onClick={deletePastItem}>Delete</button>
			</div>
		</div>
	);
	const cartList = myCart.map(cart =>
		<div className={styles.clubCard} key={cart.id}>
			{cart.product.map((product: { image: string; }) => <div> <img src={imageUrl + product.image} /> </div>)}
			{cart.product.map((product: { name: string; }) => <h5>{product.name}</h5>)}
			{cart.product.map((product: { price: string; }) => <h5>{"$ " + product.price}</h5>)}
			<div className={styles.btnWrapper}>
				<button className={styles.exit} type={'button'} created-at={cart.created_at} cart-id={cart.id} onClick={deleteCartItem}>Delete</button>
			</div>
		</div>
	);

	const getCart = async () => {
		const transID = localStorage.getItem('transaction_id');
		const response = await axios.get(url + 'order/' + transID);
		if (response.status == 200) {
			setMyCart(response.data.cart);
			// console.log(response.data);
			setTotalAmount(response.data.amount);
		} else {
			// console.log(response);
		}
	}

	const completedOrders = async () => {
		const completed = await axios.get(url + 'completed/' + loggedUser.id);
		setPast(completed.data);
	}

	const makePayment = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		const response = await axios.post(url + 'checkout/' + transactionIDE);
		if (response.status == 200) {
			setPayMess('Payment made successfully.');
			console.log(response.data);
			setTimeout(() => {
				setPayMess('');
				getCart();
			}, 3000);
		} else {
			setPayMess('Payment did not complete! Try again');
			console.log(response);

			setTimeout(() => {
				setPayMess('');
			}, 3000);
		}
	}
	return (
		<>
			<div className={styles.banner}>
				<div className={styles.bannerContent}>
					<h1 className={styles.title}>Cart</h1>
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.clubWrapper}>
					{cartList}
				</div>
				<div className={styles.btnWrapper}>
					{paymentMessage !== '' ? <button
						type="submit">{paymentMessage}</button> : ''}{' '}
					<button
						onClick={() => navigate("/Product")}
						type="submit">Back</button>
				</div>
				{cartList.length > 0 ? <div className={styles.btnWrapper}>
					<button style={{ backgroundColor: 'transparent', color: 'black', textTransform: 'uppercase' }}>Cart Total: {total}</button>
					<button onClick={makePayment}>Payment</button>
				</div> : 'Nothing in the cart'}
			</div>
			<div className={styles.container}>
				<h4>Past orders</h4>
				{pastList.length > 0 ? <div className={styles.clubWrapper}>
					{pastList}
				</div> : 'No past orders'}
			</div>
		</>
	);
};

export default Cart;
