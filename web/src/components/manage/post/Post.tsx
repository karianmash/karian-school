import React from "react";
import styles from "./Post.module.css";

const Post = () => {
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Posts</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.btnWrapper}>
          <button>+ Add Post</button>
        </div>
        <div className={styles.clubWrapper}>
          <div className={styles.clubCard}>
            <h5>I am flying to India</h5>
            <div className={styles.btnWrapper}>
              <button className={styles.join}>Edit</button>
              <button className={styles.exit}>Delete</button>
            </div>
          </div>
          <div className={styles.clubCard}>
            <h5>I have joined University of texas at Arlington</h5>
            <div className={styles.btnWrapper}>
              <button className={styles.join}>Edit</button>
              <button className={styles.exit}>Delete</button>
            </div>
          </div>
          <div className={styles.clubCard}>
            <h5>I have joined UTA cultural events</h5>
            <div className={styles.btnWrapper}>
              <button className={styles.join}>Edit</button>
              <button className={styles.exit}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
