import styles from "../product/Product.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const url = "http://localhost:8000/api/";
  const imageUrl = "http://localhost:8000/uploads/";
  const [ads, setAds] = useState<any[]>([]);
  const [myAds, setMyAds] = useState<any[]>([]);

  const [userMessage, setMessage] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    getAds();
    getMyAds();
  }, []);

  const handleClick = async (e: any) => {
    e.preventDefault();
    const AdID = e.target.getAttribute("prod-id");

    const formData = new FormData();
    formData.append("ad_id", AdID);
    formData.append("user_id", currentUser.id);

    const response = await axios.post(url + "buyadvert", formData);
    if (response.status == 200) {
      setMessage("Ad added succefully.");
      getMyAds();

      setTimeout(() => {
        setMessage("");
      }, 2000);
    } else {
      console.log(response);
    }
  };

  const allAdList = ads.map((ad) => (
    <div className={styles.clubCard} key={ad.id}>
      <img src={imageUrl + ad.image} alt="Cart" />
      <h5>{ad.title}</h5>
      <h5>{ad.detail}</h5>

      <div className={styles.btnWrapper}>
        {/* <button className={styles.join}
					onClick={() => navigate("/Cart")}
					type="submit" >Add to cart</button> */}
        <button prod-id={ad.id} onClick={handleClick} className={styles.join}>
          Buy
        </button>
      </div>
    </div>
  ));

  const deleteMyAd = async (e: any) => {
    const AdID = e.target.getAttribute("prod-id");

    await axios.delete(url + "advert/" + AdID);
    getMyAds();
  };

  const myAdList = myAds.map((ad) => (
    <div className={styles.clubCard} key={ad.id}>
      <img src={imageUrl + ad.image} alt="Cart" />
      <h5>{ad.title}</h5>
      <h5>{ad.detail}</h5>

      <div className={styles.btnWrapper}>
        <button prod-id={ad.id} onClick={deleteMyAd} className={styles.join}>
          Delete
        </button>
      </div>
    </div>
  ));

  const getMyAds = async () => {
    const resp = await axios.get(url + "advert/user/" + currentUser.id);

    console.log("My ads: ", resp);

    setMyAds(resp.data);
  };

  const getAds = async () => {
    const resp = await axios.get(url + "adverts");

    console.log("All ads: ", resp);

    if (resp.status == 200) {
      setAds(resp.data);
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
          <h1 className={styles.title} style={{ color: "black" }}>
            Advertisements
          </h1>
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
        </div>

        {/* All ads */}
        <div className={styles.clubWrapper}>
          <span style={{ fontSize: "1.4rem", fontWeight: "900" }}>All Ads</span>
          {allAdList}
        </div>

        {/* My ads */}
        <div className={styles.clubWrapper} style={{ marginTop: "2rem" }}>
          <span style={{ fontSize: "1.4rem", fontWeight: "900" }}>My Ads</span>
          {myAdList}
        </div>
      </div>
    </>
  );
};

export default Product;
