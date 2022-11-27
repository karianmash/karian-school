import React from "react";
import styles from "./Student.module.css";

const StudentForm = () => {
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Add Student</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form>
            <div className={styles.field}>
              <label>Name</label>
              <input type="text" name="Name" placeholder="Enter Student Name" />
            </div>
            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Student Email ID"
              />
            </div>
            <div className={styles.field}>
              <label>Contact</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter Student Phone Number"
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

export default StudentForm;
