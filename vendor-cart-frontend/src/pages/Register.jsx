import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(name, email, password);

      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-slate-950
      px-4
    "
    >
      <div
        className="
        w-full
        max-w-md
        p-8
        rounded-3xl
        bg-white/10
        backdrop-blur-xl
        border
        border-white/20
        shadow-xl
      "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-white
          text-center
          mb-6
        "
        >
          Create Account
        </h1>

        {error && (
          <p
            className="
            text-red-400
            text-sm
            mb-4
            text-center
          "
          >
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="
              w-full
              mb-4
              p-3
              rounded-xl
              bg-black/40
              border
              border-white/20
              text-white
              outline-none
            "
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="
              w-full
              mb-4
              p-3
              rounded-xl
              bg-black/40
              border
              border-white/20
              text-white
              outline-none
            "
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="
              w-full
              mb-6
              p-3
              rounded-xl
              bg-black/40
              border
              border-white/20
              text-white
              outline-none
            "
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="
              w-full
              py-3
              rounded-xl
              bg-green-600
              hover:bg-green-500
              text-white
              font-semibold
              transition
            "
          >
            Register
          </button>
        </form>

        <p
          className="
          text-gray-300
          text-center
          mt-5
        "
        >
          Already have an account?{" "}
          <Link to="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
