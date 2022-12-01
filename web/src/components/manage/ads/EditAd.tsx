import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../clubs/Clubs.module.css";

const EditProduct = () => {
  const { ad } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000/api/";
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [userRes, setUserMessage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");

  let adId = parseInt(ad);

  useEffect(() => {
    populateAd();
  }, []);

  const populateAd = async () => {
    const resp = await axios.get(baseUrl + "adverts");

    console.log(resp);

    if (resp.status == 200) {
      let ad = resp.data.find((ad) => ad.id == adId);

      console.log(ad, " ", adId);

      setTitle(ad.title);
      setDetail(ad.detail);
    }
  };

  const saveAd = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);
    formData.append("detail", detail);

    const saveResponse = await axios.post(baseUrl + "advert/" + ad, formData);

    console.log(saveResponse);

    if (saveResponse.status == 200) {
      setUserMessage("Product updated successfully");
      setTimeout(() => {
        setUserMessage("");
        navigate("/business");
      }, 2000);
    }
  };

  const handleDataOnChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Update Ad</h1>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.btnWrapper}>
          <button onClick={() => navigate("/Ads")}>Return</button>
        </div>

        <div className={styles.formContainer}>
          <h5>{userRes}</h5>
          <form onSubmit={saveAd}>
            <div className={styles.field} style={{ marginTop: "1.5rem" }}>
              <label>Title</label>
              <input
                type="text"
                name="Title"
                value={title}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Advertise Title"
              />
            </div>

            <div className={styles.field}>
              <label>Advertise Image</label>
              <input
                type="file"
                name="imgData"
                id="upload"
                onChange={handleDataOnChange}
                accept="image/*"
                required
              />
            </div>

            <div className={styles.field}>
              <label>Detail</label>
              <input
                type="textarea"
                name="detail"
                value={detail}
                onChange={(e) => {
                  setDetail(e.target.value);
                }}
                placeholder="Enter Advert details"
              />
            </div>

            <div className={styles.btn}>
              <div className={styles.btns}>
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
