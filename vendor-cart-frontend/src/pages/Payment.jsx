import { useParams, useNavigate } from "react-router-dom";
import api from "../api/client";

export default function Payment() {
  const { id } = useParams();

  const navigate = useNavigate();

  async function pay() {
    try {
      await api("/payments", {
        method: "POST",

        body: JSON.stringify({
          order_id: id,

          status: "success",

          amount: 100,
        }),
      });

      navigate(`/invoice/${id}`);
    } catch (error) {
      console.error(error);
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
      <div
        className="
glass
rounded-3xl
p-10
text-center
max-w-md
w-full
"
      >
        <h1
          className="
text-3xl
font-bold
"
        >
          Payment
        </h1>

        <p
          className="
text-gray-300
mt-4
"
        >
          Fake payment gateway
        </p>

        <button
          onClick={pay}
          className="
mt-6
w-full
bg-green-600
hover:bg-green-500
py-3
rounded-xl
font-semibold
transition
"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
