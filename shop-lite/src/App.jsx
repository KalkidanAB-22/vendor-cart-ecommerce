import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Invoice from "./pages/Invoice";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import AdminInventory from "./pages/AdminInventory";
import AdminOrders from "./pages/AdminOrders";
import SalesOverview from "./pages/SalesOverview";
import Inventory from "./pages/Inventory";

import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <div
      className="
      min-h-screen
      bg-transparent
      text-white
      "
    >
      <Navbar />

      <main
        className="
        min-h-screen
        "
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/payment/:id" element={<Payment />} />

          <Route path="/invoice/:id" element={<Invoice />} />

          <Route path="/orders" element={<Orders />} />

          {/* ADMIN ROUTES */}

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/add"
            element={
              <ProtectedRoute adminOnly>
                <AddProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/products/edit/:id"
            element={
              <ProtectedRoute adminOnly>
                <EditProduct />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute adminOnly>
                <AdminInventory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/sales"
            element={
              <ProtectedRoute adminOnly>
                <SalesOverview />
              </ProtectedRoute>
            }
          />

          <Route path="/admin/orders" element={<AdminOrders />} />

          <Route path="/admin/inventory" element={<Inventory />} />

          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}
