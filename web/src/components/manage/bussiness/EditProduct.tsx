import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../clubs/Clubs.module.css";

const EditProduct = () => {
  const { product } = useParams();
  const navigate = useNavigate();
  const baseUrl = "http://localhost:8000/api/";
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [userRes, setUserMessage] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    populateProduct();
  }, []);

  const populateProduct = async () => {
    // const resp = await axios.get(baseUrl + "product/" + product);
    const resp = await axios.get(baseUrl + "product/user/" + loggedUser.id);

    console.log(resp);

    if (resp.status == 200) {
      let prodId = parseInt(product);
      let prod = resp.data.product.find((product) => product.id == prodId);

      console.log(prod, " ", prodId);

      setName(prod.name);
      setDescription(prod.description);
    }
  };

  const saveClub = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", price);
    formData.append("categories_id", category);
    formData.append("user_id", loggedUser.id);
    formData.append("description", description);
    formData.append("name", name);

    const saveResponse = await axios.post(
      baseUrl + "product/" + product,
      formData
    );

    console.log(saveResponse);

    if (saveResponse.status == 200) {
      setUserMessage("Product updated successfully");
      setTimeout(() => {
        setUserMessage("");
        navigate("/business");
      }, 2000);
    }
  };

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
          <button onClick={() => navigate("/business")}>Return</button>
        </div>
        <div className={styles.formContainer}>
          <h5>{userRes}</h5>
          <form onSubmit={saveClub}>
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

            <div className={styles.field} style={{ marginTop: "1.5rem" }}>
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
              <label>product Image</label>
              <input
                type="file"
                name="image"
                id="upload"
                onChange={handleDataOnChange}
                accept="image/*"
                required
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
                <button type="submit">Update</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
