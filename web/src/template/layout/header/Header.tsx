import styles from "./Header.module.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";

const Header = () => {
  const navigate = useNavigate();
  const logOut = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    localStorage.clear();
    console.log("Logged out successfully");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    middleware();
  }, []);

  const middleware = async () => {
    let userRole = loggedUser.role;
    if (userRole == "admin") {
      navigate("/admin");
    } else if (userRole == "school") {
      navigate("school");
    } else if (userRole == "business") {
      navigate("/business");
    } else if (userRole == "student") {
      navigate("/product");
    } else {
      localStorage.clear();
      navigate("/login");
    }
  };

  let chatURL = () => {
    window.open("http://127.0.0.1:8081", "_blank").focus();
  };

  return (
    <div className={styles.fluid}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <ul className={styles.headerLinks}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/service">Service</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <button onClick={chatURL}>Chat</button>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/login" onClick={logOut}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
