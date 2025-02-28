import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import HomePage from "../pages/homePage/HomePage";
import Products from "../pages/Products/Products";
import Layout from "../components/layout/Layout";
import MyProfilePage from "../pages/myProfile/MyProfilePage";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import ProductList from "../pages/Products.CRUD/ProductList.jsx";
import ProductCreate from "../pages/Products.CRUD/ProductCreate.jsx";
import ProductEdit from "../pages/Products.CRUD/ProductEdit.jsx";
import CategoriesList from "../pages/Categories.CRUD/CategoriesList.jsx";
import CategoryCreate from "../pages/Categories.CRUD/CategoryCreate.jsx";
import CategoryEdit from "../pages/Categories.CRUD/categoryEdit.jsx";
import UsersList from "../pages/Users.CRUD/UsersList.jsx";
import UserCreate from "../pages/Users.CRUD/UserCreate.jsx";
import UserEdit from "../pages/Users.CRUD/UserEdit.jsx";
import FavoriteProducts from "../pages/FavoriteProducts/FavoriteProducts.jsx";
import ManufacturersList from "../pages/Manufacturers.CRUD/ManufacturersList.jsx";
import ManufacterCreate from "../pages/Manufacturers.CRUD/ManufacterCreate.jsx";
import ManufacterEdit from "../pages/Manufacturers.CRUD/ManufacterEdit.jsx";


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

        <Route path="/usersList" element={<UsersList />} />
        <Route path="/userCreate" element={<UserCreate />} />
        <Route path="/userEdit/:id" element={<UserEdit />} />

        <Route path="/manufacturersList" element={<ManufacturersList />} />
        <Route path="/manufacterCreate" element={<ManufacterCreate />} />
        <Route path="/manufacterEdit/:id" element={<ManufacterEdit />} />
        
        <Route path="/favoriteProducts" element={<FavoriteProducts />} />
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<MyProfilePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default BasicRoute;
