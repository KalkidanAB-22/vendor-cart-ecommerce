import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCart } from "../context/CartContext";
import api from "../api/client";

export default function Checkout() {
  const { orderId } = useParams();

  const { cart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [order, setOrder] = useState(null);

  // Load existing order when coming from Orders page
  useEffect(() => {
    async function loadOrder() {
      if (!orderId) return;

      try {
        const orders = await api("/orders");

        const existingOrder = orders.find(
          (item) => item.id === Number(orderId),
        );

        setOrder(existingOrder);
      } catch (error) {
        console.error(error);
      }
    }

    loadOrder();
  }, [orderId]);

  const total = order
    ? Number(order.total_amount)
    : cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  async function checkout() {
    if (!paymentMethod) {
      setError("Please select a payment method");

      return;
    }

    try {
      setLoading(true);

      setError("");

      let id = orderId;

      // If this is a new checkout from cart
      if (!id) {
        const orderResponse = await api("/orders/checkout", {
          method: "POST",

          body: JSON.stringify({
            payment_method: paymentMethod,
          }),
        });

        id = orderResponse.order.id;
      }

      // Create Stripe payment

      const paymentResponse = await api("/payments/create", {
        method: "POST",

        body: JSON.stringify({
          order_id: Number(id),

          payment_method: paymentMethod,
        }),
      });

      if (paymentResponse.url) {
        window.location.href = paymentResponse.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);

      setError(error.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen p-6">
      <h1
        className="
        text-3xl
        font-bold
        text-white
        mb-6
      "
      >
        Checkout
      </h1>

      <div
        className="
        glass
        rounded-3xl
        p-6
        max-w-xl
      "
      >
        {error && (
          <p
            className="
            text-red-400
            mb-5
          "
          >
            {error}
          </p>
        )}

        {orderId ? (
          <div className="text-white space-y-3">
            <h2 className="text-xl font-semibold">Order #{orderId}</h2>

            <p>Status: {order?.status}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="
                flex
                justify-between
                border-b
                border-white/10
                pb-3
                "
              >
                <span className="text-white">
                  {item.name} x {item.quantity}
                </span>

                <span className="text-green-400">
                  €{(Number(item.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div
          className="
          mt-6
          flex
          justify-between
          text-xl
          font-bold
        "
        >
          <span className="text-white">Total</span>

          <span className="text-green-400">€{total.toFixed(2)}</span>
        </div>

        <div
          className="
          mt-8
          space-y-4
        "
        >
          <h2 className="text-white font-semibold">Choose Payment Method</h2>

          <label
            className="
            flex
            gap-3
            text-white
            cursor-pointer
          "
          >
            <input
              type="radio"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Card Payment
          </label>
        </div>

        <button
          onClick={checkout}
          disabled={loading}
          className="
          mt-8
          w-full
          bg-green-600
          hover:bg-green-500
          disabled:bg-gray-600
          py-3
          rounded-xl
          font-semibold
          "
        >
          {loading ? "Processing..." : orderId ? "Pay Now" : "Place Order"}
        </button>
      </div>
    </div>
  );
}
