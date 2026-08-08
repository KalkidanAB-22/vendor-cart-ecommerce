import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        py-4
        flex
        items-center
        justify-between
        "
      >
        {/* LOGO */}

        <Link
          to="/"
          className="
          text-2xl
          font-bold
          text-white
          "
        >
          🛒 Vendor Cart
        </Link>

        {/* DESKTOP MENU */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-6
          "
        >
          <NavLink to="/">Home</NavLink>

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>

              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile">{user.name || "Profile"}</NavLink>

              <NavLink to="/orders">Orders</NavLink>

              {/* ONLY ADMIN DASHBOARD LINK */}

              {user.role === "admin" && (
                <NavLink to="/admin">Admin Dashboard</NavLink>
              )}

              <button
                onClick={logout}
                className="
                text-red-400
                hover:text-red-300
                transition
                "
              >
                Logout
              </button>
            </>
          )}

          {/* CART */}

          <Link
            to="/cart"
            className="
            relative
            px-5
            py-2
            rounded-full
            bg-green-600
            hover:bg-green-500
            text-white
            transition
            "
          >
            Cart
            <span
              className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              w-5
              h-5
              flex
              items-center
              justify-center
              rounded-full
              "
            >
              {cartCount}
            </span>
          </Link>
        </div>

        {/* MOBILE BUTTON */}

        <button
          onClick={() => setOpen(!open)}
          className="
          md:hidden
          text-white
          text-3xl
          "
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}

      {open && (
        <div
          className="
          md:hidden
          px-5
          pb-5
          flex
          flex-col
          gap-4
          bg-black/80
          backdrop-blur-xl
          "
        >
          <NavLink to="/">Home</NavLink>

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>

              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile">{user.name || "Profile"}</NavLink>

              <NavLink to="/orders">Orders</NavLink>

              {/* ONLY ADMIN DASHBOARD */}

              {user.role === "admin" && (
                <NavLink to="/admin">Admin Dashboard</NavLink>
              )}

              <button
                onClick={logout}
                className="
                text-left
                text-red-400
                "
              >
                Logout
              </button>
            </>
          )}

          <Link
            to="/cart"
            className="
            bg-green-600
            text-white
            px-5
            py-2
            rounded-full
            text-center
            "
          >
            Cart ({cartCount})
          </Link>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="
      text-gray-200
      hover:text-green-400
      transition
      "
    >
      {children}
    </Link>
  );
}
