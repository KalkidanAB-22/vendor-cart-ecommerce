import { useCart } from "../context/CartContext";
import api from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart } = useCart();

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  async function checkout() {
    const orderData = {
      items: cart.map((item) => ({
        product_id: item.product_id || item.id,
        quantity: item.quantity,
      })),

      total_amount: total,
    };

    console.log("Sending order:", orderData);

    try {
      const order = await api("/orders/checkout", {
        method: "POST",

        body: JSON.stringify(orderData),
      });

      navigate(`/payment/${order.id}`);
    } catch (error) {
      console.error("Checkout error", error);
    }
  }

  return (
    <div
      className="
      max-w-4xl
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
        text-white
        "
      >
        Checkout
      </h1>

      <div
        className="
        glass
        rounded-3xl
        p-6
        "
      >
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center">Your cart is empty</p>
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

                <span
                  className="
                  text-green-400
                  font-semibold
                  "
                >
                  €{Number(item.price) * item.quantity}
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

          <span
            className="
            text-green-400
            "
          >
            €{total}
          </span>
        </div>

        <button
          onClick={checkout}
          disabled={cart.length === 0}
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
          Place Order
        </button>
      </div>
    </div>
  );
}
