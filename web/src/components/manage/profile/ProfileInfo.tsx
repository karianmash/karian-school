import styles from "../product/Product.module.css";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const profileList = (
    <div className={styles.clubCard}>
      <table
        style={{
          width: "100%",
        }}
      >
        <tbody>
          <tr style={{ height: "3rem" }}>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              User Id:
            </td>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              {currentUser.id}
            </td>
          </tr>

          <tr style={{ height: "3rem" }}>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              Full Name:
            </td>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              {currentUser.first_name + " " + currentUser.second_name}
            </td>
          </tr>

          <tr style={{ height: "3rem" }}>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              User Email:
            </td>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              {currentUser.email}
            </td>
          </tr>

          <tr style={{ height: "3rem" }}>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              User Role:
            </td>
            <td
              style={{
                paddingLeft: "1rem",
                border: "0.1rem solid gray",
                opacity: "0.7",
              }}
            >
              {currentUser.role}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  let chatURL = () => {
    window.open("http://127.0.0.1:8081", "_blank").focus();
  };

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title} style={{ color: "black" }}>
            Profile Info
          </h1>
        </div>
      </div>

      <div className={styles.container} style={{ position: "relative" }}>
        <div className={styles.clubWrapper}>{profileList}</div>
      </div>
    </>
  );
};

export default Profile;
