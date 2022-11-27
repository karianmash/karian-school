import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Clubs.module.css";

const EditClubForm = () => {
  const { club } = useParams();
  const navigate = useNavigate();
  const baseUrl = 'http://localhost:8000/api/';
  const loggedUser = JSON.parse(localStorage.getItem('user') || '{}');
  const [userRes, setUserMessage] = useState('');

  const [name, setName] = useState('');
  const [detail, setDetail] = useState('');
  const [image, setImage] = useState('');
  useEffect(() => {
    populateClub();
  }, []);

  const populateClub = async () => {
    const resp = await axios.get(baseUrl + 'club/' + club);
    if (resp.status == 200) {
      setName(resp.data.name);
      setDetail(resp.data.detail);
      setImage(resp.data.image);
    }
  }

  const saveClub = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('detail', detail);
    formData.append('image', image);

    const saveResponse = await axios.post(baseUrl + 'club/' + club, formData);
    if (saveResponse.status == 200) {
      setUserMessage('Club updated successfully');
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
          <h1 className={styles.title}>Update Club</h1>
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
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditClubForm;
