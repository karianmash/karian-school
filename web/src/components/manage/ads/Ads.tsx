import React, { useEffect, useState } from "react";
import styles from "./Ads.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Ads = () => {
  const url = "http://localhost:8000/api/";
  const imageUrl = "http://localhost:8000/uploads/";
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [usermessage, setusermessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    redirectUser();
    getMyAds();
  }, []);

  const deleteAdvert = async (e: any) => {
    e.preventDefault();
    let adID = e.target.getAttribute("ad-id");

    const deleteResp = await axios.delete(url + "advert/" + adID);
    if (deleteResp.status == 200) {
      getMyAds();
      setusermessage("Advert deleted successfully");

      setTimeout(() => {
        setusermessage("");
      }, 2000);
    } else {
      console.log(deleteResp);
    }
  };

  const [ads, setAds] = useState<any[]>([]);
  const adList = ads.map((ad) => (
    <div
      className={styles.content}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* <div>
        <img src={`${ad.image}`} />
      </div> */}
      <img
        src={imageUrl + ad.image}
        alt="Cart"
        style={{ height: "100px", width: "auto" }}
      />
      <h2>{ad.title}</h2>
      <p> {ad.detail}</p>
      <div className={styles.btnWrapper}>
        <button ad-id={ad.id} onClick={deleteAdvert} type="submit">
          Delete
        </button>
      </div>
    </div>
  ));

  const getMyAds = async () => {
    const response = await axios.get(url + "advert/user/" + currentUser.id);
    if (response.status == 200) {
      console.log(response.data);
      setAds(response.data);
    } else {
      // console.log(response);
    }
  };

  const redirectUser = () => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    const role = currentUser.role;

    if (role !== "business") {
      navigate("/login");
    } else {
    }
  };
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Ads</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div style={{ padding: "10px 0px 10px 0px" }}>{usermessage}</div>
        <div className={styles.btnWrapper}>
          <button onClick={() => navigate("/business")} type="submit">
            Go back
          </button>
          {"  "}
          <button onClick={() => navigate("/addads")} type="submit">
            Create Advertisement
          </button>
        </div>
        {adList}
      </div>
    </>
  );
};

export default Ads;
