import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Ads.module.css";

const AdsForm = () => {
  const url = 'http://localhost:8000/api/';
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [userMessage, setUserMessage] = useState('');

  const uploadAdvert = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('detail', detail);
    formData.append('image', image);
    formData.append('user_id', currentUser.id);

    const response = await axios.post(url + 'advert', formData);
    if (response.status == 200) {
      setUserMessage('Advert added successfully');
      setTimeout(() => {
        navigate('/Ads');
      }, 2000);
    } else {
      // console.log(response);

    }
  }

  const handleDataOnChange = (e: any) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Add Advertisement</h1>
        </div>
      </div>
      <div className={styles.container}>

        <div style={{ padding: '10px 0px 20px 0px' }}>{userMessage}</div>
        <div className={styles.formContainer}>
          <form onSubmit={uploadAdvert}>
            <div className={styles.field}>
              <label>Title</label>
              <input
                type="text"
                name="Title"
                placeholder="Enter Advertise Title"
                value={title}
                onChange={(e) => { setTitle(e.target.value) }}
              />
            </div>
            <div className={styles.field}>
              <label>Advertise Image</label>
              <input
                type="file"
                name="imgData"
                id="upload"
                onChange={(handleDataOnChange)}
                accept="image/*"
              />
            </div>
            <div className={styles.field}>
              <label>Detail</label>
              <input
                type="textarea"
                name="detail"
                placeholder="Enter Advert details"
                value={detail}
                onChange={(e) => { setDetail(e.target.value) }}
              />
            </div>
            <div className={styles.btn}>
              <div className={styles.btns}>
                <button type="submit">Add</button>
              </div>
              <div className={styles.btns}>
                <button style={{ backgroundColor: "#24a0ed" }}>Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdsForm;
