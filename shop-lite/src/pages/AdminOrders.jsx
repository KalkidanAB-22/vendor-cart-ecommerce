import { useEffect, useState } from "react";
import api from "../api/client";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadOrders() {
    try {
      const data = await api("/orders");

      setOrders(data);
    } catch (error) {
      console.error("Load orders error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function deleteOrder(id) {
    try {
      await api(`/orders/${id}`, {
        method: "DELETE",
      });

      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.error("Delete order error:", error);
    }
  }

  if (loading) {
    return <div className="p-10 text-white">Loading orders...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>

      <div
        className="
        glass
        rounded-3xl
        overflow-hidden
        "
      >
        <table className="w-full">
          <thead>
            <tr
              className="
              bg-white/10
              text-gray-300
              "
            >
              <th className="p-4">ID</th>

              <th className="p-4">Customer</th>

              <th className="p-4">Total</th>

              <th className="p-4">Status</th>

              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="
                border-t
                border-white/10
                "
                >
                  <td className="p-4">#{order.id}</td>

                  <td className="p-4">{order.customer_name || "Guest"}</td>

                  <td className="p-4 text-green-400">${order.total_amount}</td>

                  <td className="p-4">
                    <span
                      className="
                    bg-yellow-500/20
                    text-yellow-300
                    px-3
                    py-1
                    rounded-full
                    "
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => deleteOrder(order.id)}
                      className="
                    bg-red-600
                    hover:bg-red-500
                    px-4
                    py-2
                    rounded-xl
                    "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
