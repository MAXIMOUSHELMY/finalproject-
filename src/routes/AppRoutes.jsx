import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import VerifyOTP from "../pages/VerifyOTP/VerifyOTP";

import Checkout from "../pages/Checkout/Checkout";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Profile from "../pages/Profile/Profile";
import Orders from "../pages/Orders/Orders";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import OrderDetails from "../pages/OrderDetails/OrderDetails";
import AdminProducts from "../pages/Admin/Products/Products";
import Products from "../pages/Products/Products";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Wishlist from "../pages/Wishlist/Wishlist";
import Cart from "../pages/Cart/Cart";

function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/admin/products" element={<AdminProducts />} />

      <Route
  path="/wishlist"
  element={<Wishlist />}
/>

      <Route
  path="/checkout"
  element={<Checkout />}
/>
 
<Route
  path="/orders"
  element={<Orders />}
/>

<Route
  path="/orders/:id"
  element={<OrderDetails />}
/>

<Route
  path="/profile"
  element={<Profile />}
/>
      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />

      <Route
        path="/cart"
        element={<Cart />}
      />

    </Routes>

    
  );
}

export default AppRoutes;