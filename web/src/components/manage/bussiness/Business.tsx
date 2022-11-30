import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Business.module.css";
import productstyles from "../product/Product.module.css";

const Business = () => {
  const url = "http://localhost:8000/api/";
  const imageUrl = "http://localhost:8000/uploads/";

  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [products, setProducts] = useState<any[]>([]);
  const [ads, setAds] = useState<any[]>([]);

  useEffect(() => {
    getMyProducts();
    // getMyAds();
  }, []);

  const deleteProduct = async (e: {
    [x: string]: any;
    preventDefault: () => void;
  }) => {
    e.preventDefault();
    const prodID = e.target.getAttribute("prod-id");
    const response = await axios.delete(url + "product/" + prodID);
    if (response.status == 200) {
      getMyProducts();
    }
    // console.log(prodID);
  };

  const productList = products.map((product) => (
    <div className={productstyles.clubCard}>
      <img
        src={imageUrl + product.image}
        alt="Cart"
        style={{ height: "70px" }}
      />
      <h5>{product.name}</h5>
      <h5>{product.description}</h5>
      <div className={productstyles.btnWrapper}>
        {/* <button className={productstyles.join}
					onClick={() => navigate("/Cart")}
					type="submit">Buy</button> */}
        <button
          onClick={deleteProduct}
          className={productstyles.join}
          prod-id={product.id}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  const getMyProducts = async () => {
    const response = await axios.get(url + "product/user/" + currentUser.id);
    if (response.status == 200) {
      // console.log(response.data.product);
      setProducts(response.data.product);
    } else {
      // console.log(response);
    }
  };

  //   const getMyAds = async () => {
  //     const response = await axios.get(url + "advert/user/" + currentUser.id);
  //     if (response.status == 200) {
  //       console.log(response.data);
  //       setAds(response.data);
  //     } else {
  //       // console.log(response);
  //     }
  //   };

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Business</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.cardContainer} style={{ marginBottom: "10px" }}>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Manage Advertisements</h3>
              {currentUser.role == "business" ? (
                <button onClick={() => navigate("/Ads")} type="submit">
                  Create Ads
                </button>
              ) : (
                ""
              )}
              {/* <button
								onClick={() => navigate("/Ads")}
								type="submit">View Ads</button> */}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>Manage Products</h3>
              <button onClick={() => navigate("/addproduct")} type="submit">
                Sell Products
              </button>
              {currentUser.role !== "business" ? (
                <button onClick={() => navigate("/Product")} type="submit">
                  Buy Products
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            marginBottom: "10px",
            padding: "10px 5px 10px 10px",
            backgroundColor: "blueviolet",
            color: "white",
            textTransform: "uppercase",
          }}
        >
          My Products
        </div>
        <div className={productstyles.cardContainer}>{productList}</div>
      </div>
    </>
  );
};

export default Business;
