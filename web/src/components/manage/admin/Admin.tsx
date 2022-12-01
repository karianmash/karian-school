import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Admin.module.css";

const Admin = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const baseUrl = "http://localhost:8000/api/";
  const [students, setStudents] = useState<any[]>([]);
  const [usersTitle, setTitle] = useState("");
  const [userMessage, setUserMessage] = useState("");

  useEffect(() => {
    setUserRole();
    getStudents();
  }, []);

  const deleteUser = async (e: any) => {
    e.preventDefault();
    let userID = e.target.getAttribute("user-id");
    const deleteRes = await axios.delete(baseUrl + "user/delete/" + userID);
    if (deleteRes.status == 200) {
      setUserMessage("User deleted successfully");
      setTimeout(() => {
        setUserMessage("");
        getStudents();
      }, 3000);
    }
  };
  const studentList = students.map((student) => (
    <div className={styles.clubCard} key={student.id}>
      <h5>{student.first_name + " " + student.second_name}</h5>
      <div className={styles.btnWrapper}>
        {student.role == "student" ? (
          <button
            user-id={student.id}
            onClick={() => navigate("/user/update/" + student.id)}
            className={styles.exit}
          >
            Edit
          </button>
        ) : (
          ""
        )}
        <button
          className={styles.exit}
          user-id={student.id}
          onClick={deleteUser}
        >
          Delete
        </button>
      </div>
    </div>
  ));

  const setUserRole = async () => {
    if (loggedUser.role == "admin") {
      setRole(loggedUser.role);
    } else if (loggedUser.role == "business") {
      setRole(loggedUser.role);
    } else if (loggedUser.role == "school") {
      setRole(loggedUser.role);
    } else {
      setRole("");
    }
  };

  const getStudents = async () => {
    const res = await axios.get(baseUrl + "users/student");
    setStudents(res.data.users);
    setTitle("Students");
  };

  const fetchUsers = async (e: any) => {
    const userType = e.target.getAttribute("user-role");
    const res = await axios.get(baseUrl + "users/" + userType);
    setStudents(res.data.users);
    setTitle(userType + " list");
  };

  let chatURL = () => {
    window.open("http://127.0.0.1:8081", "_blank").focus();
  };

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title} style={{ textTransform: "capitalize" }}>
            {role}
          </h1>
        </div>
      </div>
      <div className={styles.container} style={{ position: "relative" }}>
        <div style={{ position: "absolute" }}>{userMessage}</div>
        <div className={styles.btnWrapper}>
          <button onClick={chatURL}>Chat</button>
          <button onClick={fetchUsers} user-role={"student"}>
            Students
          </button>
          {loggedUser.role == "admin" ? (
            <button onClick={fetchUsers} user-role={"school"}>
              School Admins
            </button>
          ) : (
            ""
          )}
          <button onClick={fetchUsers} user-role={"business"}>
            Business Owners
          </button>
          <button onClick={() => navigate("/clubs")}>Clubs & Posts</button>
        </div>
        <div className={styles.clubWrapper}>
          <h4 style={{ textTransform: "capitalize" }}>{usersTitle}</h4>
          {studentList.length > 0 ? studentList : usersTitle + " empty"}
        </div>
      </div>
    </>
  );
};

export default Admin;
