import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import styles from "./Clubs.module.css";

const ClubForm = () => {
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000/api/';
  const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [userRes, setUserMessage] = useState('');

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');

  const saveClub = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('detail', detail);
    formData.append('image', image);
    formData.append('user_id', loggedUser.id);

    const saveResponse = await axios.post(baseUrl + 'club', formData);
    if (saveResponse.status == 200) {
      setUserMessage('Club saved successfully');
      setTimeout(() => {
        setUserMessage('');
        navigate('/clubs');
      }, 3000);
    }
  }
  const handleDataOnChange = (e: any) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Add Club</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.btnWrapper}>
          <button onClick={() => navigate('/clubs')}>Return</button>
        </div>
        <div className={styles.formContainer}>
          <h5>{userRes}</h5>
          <form onSubmit={saveClub}>
            <div className={styles.field}>
              <label>Name</label>
              <input type="text" name="Name" placeholder="Enter Club Name" required
                value={name}
                onChange={(e) => { setName(e.target.value) }}
              />
            </div>
            <div className={styles.field}>
              <label>Club Image</label>
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
              <label>Description</label>
              <input
                type="textarea"
                name="description"
                placeholder="Enter Club Description"
                required
                onChange={(e) => { setDetail(e.target.value) }}
                value={detail}
              />
            </div>
            <div className={styles.btn}>
              <div className={styles.btns}>
                <button type="submit">Add</button>
              </div>
              {/* <div className={styles.btns}>
                <button style={{ backgroundColor: "#24a0ed" }}>Update</button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClubForm;
