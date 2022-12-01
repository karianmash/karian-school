import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../components/about/About";
import ForgotPassoword from "../components/auth/forgotPassword/ForgotPassword";
import Login from "../components/auth/login/Login";
import Signup from "../components/auth/signup/Signup";
import Chat from "../components/chat/Chat";
import Contact from "../components/contact/Contact";
import Admin from "../components/manage/admin/Admin";
import Ads from "../components/manage/ads/Ads";
import AdsForm from "../components/manage/ads/AdsForm";
import Business from "../components/manage/bussiness/Business";
import Cart from "../components/manage/cart/Cart";
import Clubs from "../components/manage/clubs/Clubs";
import ClubForm from "../components/manage/clubs/ClubForm";
import EditProduct from "../components/manage/bussiness/EditProduct";
import EditAd from "../components/manage/ads/EditAd";
import Advertisement from "../components/manage/student/Advertisement";

import ProfileInfo from "../components/manage/profile/ProfileInfo";

import Post from "../components/manage/post/Post";
import Product from "../components/manage/product/Product";
import Site from "../components/manage/site/Site";
import Student from "../components/manage/student/Student";
import Service from "../components/service/Service";
import Layout from "./layout/Layout";
import OuterLayout from "./outerlayout/OuterLayout";
import StudentForm from "../components/manage/student/StudentForm";
import ProductForm from "../components/manage/product/ProductForm";
import UserUpdate from "../components/manage/update";
import EditClubForm from "../components/manage/clubs/EditClubForm";

const Templete = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OuterLayout />}>
          <Route path="/" element={<Login />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route index path="/forgot-password" element={<ForgotPassoword />} />
        </Route>
        <Route path="/">
          <Route path="/" element={<Layout />}>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/service" element={<Service />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/advertisement" element={<Advertisement />} />

            <Route path="/addclub" element={<ClubForm />} />
            <Route path="/editclub/:club" element={<EditClubForm />} />
            <Route path="/editproduct/:product" element={<EditProduct />} />
            <Route path="/editad/:ad" element={<EditAd />} />

            <Route path="/posts" element={<Post />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product" element={<Product />} />
            <Route path="/addproduct" element={<ProductForm />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/school" element={<Admin />} />
            <Route path="/user/update/:user" element={<UserUpdate />} />
            <Route path="/student" element={<Student />} />
            <Route path="/addstudent" element={<StudentForm />} />
            <Route path="/site" element={<Site />} />
            <Route path="/business" element={<Business />} />
            <Route path="/ads" element={<Ads />} />

            <Route path="/addads" element={<AdsForm />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/user/:user" element={<Chat />} />

            <Route path="/profile" element={<ProfileInfo />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Templete;
