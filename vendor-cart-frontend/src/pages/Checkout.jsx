import { useState } from "react";

import { useCart } from "../context/CartContext";
import api from "../api/client";

export default function Checkout() {
  const { cart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  async function checkout() {
    if (!paymentMethod) {
      setError("Please select a payment method");

      return;
    }

    try {
      setLoading(true);
      setError("");

      const paymentData = {
        payment_method: paymentMethod,

        items: cart.map((item) => ({
          name: item.name,

          price: Number(item.price),

          quantity: item.quantity,
        })),
      };

      console.log("Payment request:", paymentData);

      const response = await api("/payments/create", {
        method: "POST",

        body: JSON.stringify(paymentData),
      });

      /*
        Stripe returns checkout URL

        Example:
        https://checkout.stripe.com/...
      */

      if (response.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);

      setError(error.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
      min-h-screen
      bg-slate-950
      px-4
      py-10
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        text-white
        mb-8
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

        {cart.length === 0 ? (
          <p
            className="
            text-gray-400
            text-center
            "
          >
            Your cart is empty
          </p>
        ) : (
          <div
            className="
            space-y-4
            "
          >
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
                <span
                  className="
                  text-white
                  "
                >
                  {item.name}
                  {" x "}
                  {item.quantity}
                </span>

                <span
                  className="
                  text-green-400
                  "
                >
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
          <span
            className="
            text-white
            "
          >
            Total
          </span>

          <span
            className="
            text-green-400
            "
          >
            €{total.toFixed(2)}
          </span>
        </div>

        <div
          className="
          mt-8
          space-y-4
          "
        >
          <h2
            className="
            text-white
            font-semibold
            "
          >
            Choose Payment Method
          </h2>

          <label
            className="
            flex
            items-center
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

          <label
            className="
            flex
            items-center
            gap-3
            text-gray-400
            cursor-not-allowed
            "
          >
            <input type="radio" disabled />
            📱 Telebirr (Coming Soon)
          </label>

          <label
            className="
            flex
            items-center
            gap-3
            text-gray-400
            cursor-not-allowed
            "
          >
            <input type="radio" disabled />
            🏦 CBE (Coming Soon)
          </label>
        </div>

        <button
          onClick={checkout}
          disabled={cart.length === 0 || loading}
          className="
          mt-8
          w-full
          bg-green-600
          hover:bg-green-500
          disabled:bg-gray-600
          py-3
          rounded-xl
          font-semibold
          transition
          "
        >
          {loading ? "Processing..." : "Proceed To Payment"}
        </button>
      </div>
    </div>
  );
}
