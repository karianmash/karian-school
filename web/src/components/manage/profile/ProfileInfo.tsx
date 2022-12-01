import styles from "./Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const url = "http://localhost:8000/api/";
  const imageUrl = "http://localhost:8000/uploads/";
  const [products, setProducts] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const transactionId = localStorage.getItem("transaction_id") || "TRANS";
  const [userMessage, setMessage] = useState("");
  const navigate = useNavigate();
  const [count, setCartCount] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    getProducts();
    getCart();
    generateTransactionId();
  }, []);

  const generateTransactionId = async () => {
    let transID = localStorage.getItem("transaction_id");
    if (transID == null) {
      const transactionID = (Math.random() + 1)
        .toString(36)
        .substring(2)
        .toUpperCase();
      if (typeof Storage !== "undefined") {
        localStorage.setItem("transaction_id", transactionID);
      }
    }
  };

  const handleClick = async (e: any) => {
    e.preventDefault();
    const productID = e.target.getAttribute("prod-id");
    const productPrice = e.target.getAttribute("prod-price");

    const formData = new FormData();
    formData.append("transaction_id", transactionId);
    formData.append("product_id", productID);
    formData.append("amount", productPrice);
    formData.append("user_id", currentUser.id);

    const response = await axios.post(url + "order", formData);
    if (response.status == 200) {
      setMessage("Product added to cart.");
      getCart();
      setTimeout(() => {
        setMessage("");
      }, 4000);
    } else {
      console.log(response);
    }
  };

  const productList = products.map((product) => (
    <div className={styles.clubCard} key={product.id}>
      <img src={imageUrl + product.image} alt="Cart" />
      <h5>{product.name}</h5>
      <h5>{product.description}</h5>
      <div className={styles.btnWrapper}>
        {/* <button className={styles.join}
					onClick={() => navigate("/Cart")}
					type="submit" >Add to cart</button> */}
        <button
          prod-id={product.id}
          prod-price={product.price}
          onClick={handleClick}
          className={styles.join}
        >
          Add to Cart
        </button>
      </div>
    </div>
  ));

  const getCart = async () => {
    const transID = localStorage.getItem("transaction_id");
    const response = await axios.get(url + "order/" + transID);
    setCartCount(response.data.cart.length);
  };

  const getProducts = async () => {
    const resp = await axios.get(url + "products");
    if (resp.status == 200) {
      setProducts(resp.data);
    } else {
      console.log(resp);
    }
  };

  let chatURL = () => {
    window.open("http://127.0.0.1:8081", "_blank").focus();
  };

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Products</h1>
        </div>
      </div>

      <div className={styles.container} style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>
          {userMessage !== "" ? (
            <h5
              style={{
                backgroundColor: "orange",
                padding: "5px",
                borderRadius: "5px",
              }}
            >
              {userMessage}
            </h5>
          ) : (
            ""
          )}
        </div>
        <div className={styles.btnWrapper}>
          <button onClick={chatURL}>Chat</button>
          <button onClick={() => navigate("/product")}>Home</button>
          <button onClick={() => navigate("/clubs")}>Clubs</button>
          <button onClick={() => navigate("/advertisement")}>
            Advertisement
          </button>
          <button onClick={() => navigate("/Cart")} type="button">
            {" "}
            {count > 0 ? <span>{count + "  "}</span> : ""}
            {"  "}
            <span style={{ marginLeft: "10px" }}>Go to Cart</span>
          </button>
        </div>

        <div className={styles.clubWrapper}>{productList}</div>
      </div>
    </>
  );
};

export default Profile;
