import React, { useEffect, useState } from "react";
import styles from "./Product.module.css";
import Product from "./Product";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductForm = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const role = currentUser.role;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    redirectUser();
  }, []);
  const redirectUser = () => {
    if (role !== "business") {
      navigate(-1);
    }
  };

  const handleDataOnChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const saveProduct = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("categories_id", category);
    formData.append("user_id", currentUser.id);

    const response = await axios.post(
      "http://localhost:8000/api/product",
      formData
    );
    if (response.status == 200) {
      // console.log(response);
      setMessage("Product added Successfully");
      setTimeout(() => {
        navigate("/business");
      }, 200);
    }
  };
  const navigateBack = (e: any) => {
    navigate("/business");
  };

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.title}>Add Products</h1>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div style={{ marginBottom: "5px" }}>{message}</div>
          <form onSubmit={saveProduct}>
            <div className={styles.field}>
              <select
                name="category"
                defaultValue={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                id="category"
                style={{ padding: "7px", borderRadius: "5px" }}
              >
                <option value="0" disabled>
                  Product Category
                </option>
                <option value="1">Fashion</option>
                <option value="2">Electronics</option>
                <option value="3">Furniture</option>
                <option value="4">Beauty</option>
                <option value="5">Household Care</option>
              </select>
            </div>

            <div className={styles.field}>
              <label>Name</label>
              <input
                type="text"
                name="Product Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Product Name"
              />
            </div>

            <div className={styles.field}>
              <label>Description</label>
              <input
                type="text"
                name="Product Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                placeholder="Enter Product Description"
              />
            </div>
            
            <div className={styles.field}>
              <label>Product Image</label>
              <input
                type="file"
                name="imgData"
                id="upload"
                onChange={handleDataOnChange}
                accept="image/*"
              />
            </div>
            <div className={styles.field}>
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                placeholder="Enter Price Of The Product"
              />
            </div>
            <div className={styles.btn}>
              <div className={styles.btns}>
                <button onClick={navigateBack} type="button">
                  Go back
                </button>
              </div>
              <div className={styles.btns}>
                <button type="submit">Add</button>
              </div>
              {/* <div className={styles.btns}>
                <button style={{ backgroundColor: "#24a0ed" }} onClick={updateProduct}>Update</button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
