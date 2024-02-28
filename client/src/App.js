import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";

import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateDropShippingProduct from "./pages/Admin/CreateDropShippingProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import DropShippingProducts from "./pages/Admin/DropShippingProducts";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import UpdateDropShippingProduct from "./pages/Admin/UpdateDropShippingProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import CreatePost from "./pages/Admin/CreatePost";
import EditPost from "./pages/Admin/EditPost";
import IndexPage from "./pages/Admin/IndexPage";
import PostPage from "./pages/Admin/PostPage";
import BlogPage from "./pages/BlogPage";
import BlogDetail from "./pages/BlogDetail";
import DropShippingProductPage from "./pages/DropShippingProductPage";
import DropShippingProductDetail from "./pages/DropShippingProductDetails";
import DropShippingCartPage from "./pages/DropShippingCartPage";
function App() {
 
  return (
    <>
   
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dropShippingProduct" element={<DropShippingProductPage />} />
        <Route path="/dropShippingProduct/:slug" element={<DropShippingProductDetail />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} /> 
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/dropShippingCart" element={<DropShippingCartPage/>} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/create-dropShippingProduct" element={<CreateDropShippingProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/updateDropShippingProduct/:slug" element={<UpdateDropShippingProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/dropShippingProducts" element={<DropShippingProducts />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/create-post" element={<CreatePost />} />
          <Route path="admin/edit-post/:slug" element={<EditPost />} />
          <Route path="admin/posts" element={<IndexPage />} />
          <Route path="admin/posts/:slug" element={<PostPage />} />
         
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;