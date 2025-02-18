import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import HomePage from "../pages/homePage/HomePage";
import Products from "../pages/Products/Products";
import Layout from "../components/layout/Layout";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductList from "../pages/Products.CRUD/ProductList.jsx";
import ProductCreate from "../pages/Products.CRUD/ProductCreate.jsx";
import ProductEdit from "../pages/Products.CRUD/ProductEdit.jsx";
import CategoriesList from "../pages/Categories.CRUD/CategoriesList.jsx";
import CategoryCreate from "../pages/Categories.CRUD/CategoryCreate.jsx";
import CategoryEdit from "../pages/Categories.CRUD/categoryEdit.jsx";


const BasicRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        
        <Route path="/productList" element={<ProductList />} />
        <Route path="/productCreate" element={<ProductCreate />} />
        <Route path="/productEdit/:id" element={<ProductEdit />} />

        <Route path="/categoriesList" element={<CategoriesList />} />
        <Route path="/categoryCreate" element={<CategoryCreate />} />
        <Route path="/categoryEdit/:id" element={<CategoryEdit />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default BasicRoute;
