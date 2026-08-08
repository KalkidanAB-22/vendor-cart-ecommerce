import { useEffect, useState } from "react";
import api from "../api/client";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  async function loadOrders() {
    const data = await api("/orders");

    setOrders(data);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function removeOrder(id) {
    try {
      await api(`/orders/${id}`, {
        method: "DELETE",
      });

      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Remove order error", error);
    }
  }

  return (
    <div
      className="
max-w-5xl
mx-auto
px-4
py-10
"
    >
      <h1
        className="
text-3xl
font-bold
mb-8
"
      >
        My Orders
      </h1>

      <div
        className="
space-y-5
"
      >
        {orders.map((order) => (
          <div
            key={order.id}
            className="
glass
rounded-3xl
p-6

flex
flex-col
sm:flex-row

justify-between
items-start
sm:items-center

gap-5
"
          >
            <div>
              <h2
                className="
text-xl
font-bold
"
              >
                Order #{order.id}
              </h2>

              <p
                className="
text-gray-300
mt-2
"
              >
                Status:
                {order.status}
              </p>

              <p
                className="
text-green-400
font-bold
mt-1
"
              >
                Total: €{order.total_amount}
              </p>
            </div>

            <button
              onClick={() => removeOrder(order.id)}
              className="
bg-red-600
hover:bg-red-500
px-4
py-2
rounded-xl
transition
"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
