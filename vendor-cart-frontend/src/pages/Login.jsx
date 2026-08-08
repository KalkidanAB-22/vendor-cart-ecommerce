import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(email, password);

      navigate("/");
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
px-4
"
    >
      <form
        onSubmit={handleSubmit}
        className="
glass
w-full
max-w-md
rounded-3xl
p-8
"
      >
        <h1
          className="
text-3xl
font-bold
mb-6
text-center
"
        >
          Login
        </h1>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          className="
w-full
mb-4
p-3
rounded-xl
bg-black/40
border
border-white/20
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
transition
font-semibold
"
        >
          Login
        </button>
      </form>
    </div>
  );
}
