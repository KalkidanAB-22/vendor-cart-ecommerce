import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div
        className="
        min-h-screen
        bg-slate-950
        text-white
        flex
        items-center
        justify-center
        "
      >
        Please login first
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-slate-950
      text-white
      p-8
      "
    >
      <div
        className="
        max-w-3xl
        mx-auto
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          mb-8
          "
        >
          My Profile
        </h1>

        <div
          className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-8
          "
        >
          {/* PROFILE HEADER */}

          <div
            className="
            flex
            items-center
            gap-5
            mb-8
            "
          >
            <div
              className="
              w-20
              h-20
              rounded-full
              bg-green-600
              flex
              items-center
              justify-center
              text-3xl
              font-bold
              "
            >
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2
                className="
                text-2xl
                font-semibold
                "
              >
                {user.name}
              </h2>

              <p
                className="
                text-gray-400
                "
              >
                {user.email}
              </p>
            </div>
          </div>

          {/* USER DETAILS */}

          <div
            className="
            space-y-5
            "
          >
            <InfoRow label="Full Name" value={user.name} />

            <InfoRow label="Email" value={user.email} />

            <InfoRow
              label="Account Type"
              value={user.role === "admin" ? "Administrator" : "Customer"}
            />

            <InfoRow label="Account Status" value="Active" />
          </div>

          {/* ACTIONS */}

          <div
            className="
            mt-8
            flex
            flex-wrap
            gap-4
            "
          >
            <Link
              to="/orders"
              className="
              bg-green-600
              hover:bg-green-500
              px-5
              py-2
              rounded-full
              transition
              "
            >
              My Orders
            </Link>

            <Link
              to="/cart"
              className="
              bg-white/10
              hover:bg-white/20
              px-5
              py-2
              rounded-full
              transition
              "
            >
              My Cart
            </Link>

            <button
              onClick={logout}
              className="
              bg-red-600/80
              hover:bg-red-500
              px-5
              py-2
              rounded-full
              transition
              "
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div
      className="
      flex
      justify-between
      border-b
      border-white/10
      pb-3
      "
    >
      <span
        className="
        text-gray-400
        "
      >
        {label}
      </span>

      <span
        className="
        font-medium
        "
      >
        {value || "Not available"}
      </span>
    </div>
  );
}
