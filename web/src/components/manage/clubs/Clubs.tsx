import { useEffect, useState } from "react";
import styles from "./Clubs.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Clubs = () => {
  const navigate = useNavigate();
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const baseUrl = "http://localhost:8000/api/";
  const imageUrl = "http://localhost:8000/uploads/";
  const [clubs, setClubs] = useState<any[]>([]);

  useEffect(() => {
    getClubs();
  }, []);

  const getClubs = async () => {
    const clubsres = await axios.get(baseUrl + "clubs");
    if (clubsres.status == 200) {
      // console.log(clubsres.data);
      setClubs(clubsres.data);
    } else {
      // console.log(clubsres);
    }
  };

  const deleteClub = async (e: any) => {
    const clubID = e.target.getAttribute("club-id");
    const deleteRes = await axios.delete(baseUrl + "club/" + clubID);
    if (deleteRes.status == 200) {
      console.log(deleteRes.data);
      getClubs();
    }
  };

  const clubList = clubs.map((club) => (
    <div className={styles.clubCard} key={club.id}>
      <img
        src={imageUrl + club.image}
        alt="Club"
        style={{ width: "auto", height: "6rem" }}
      />
      <h5>{club.name}</h5>
      <h5>{club.detail}</h5>
      <div className={styles.btnWrapper}>
        {club.user_id == loggedUser.id ? (
          <>
            <button
              className={styles.join}
              onClick={() => navigate("/editclub/" + club.id)}
            >
              Edit
            </button>
            <button
              className={styles.exit}
              club-id={club.id}
              onClick={deleteClub}
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button className={styles.join}>Join Club</button>
            <button className={styles.exit}>Exit Club</button>
          </>
        )}
      </div>
    </div>
  ));

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Clubs</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.btnWrapper}>
          <button onClick={() => navigate("/product")}>Return</button>
          <button onClick={() => navigate("/addclub")} type="submit">
            + Add Club
          </button>
        </div>
        <div className={styles.clubWrapper}>
          {clubList.length > 0 ? clubList : "No clubs registered"}
        </div>
      </div>
    </>
  );
};

export default Clubs;
