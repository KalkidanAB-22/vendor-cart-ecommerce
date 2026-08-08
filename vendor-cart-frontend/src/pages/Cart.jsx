import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

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
        Your Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <div
          className="
glass
rounded-2xl
p-10
text-center
"
        >
          <p
            className="
text-gray-300
text-lg
"
          >
            Your cart is empty
          </p>
        </div>
      ) : (
        <>
          <div
            className="
space-y-5
"
          >
            {cart.map((item) => (
              <div
                key={item.id}
                className="
glass
rounded-2xl
p-5

flex
flex-col
sm:flex-row

justify-between
items-start
sm:items-center

gap-4

"
              >
                <div>
                  <h2
                    className="
text-xl
font-semibold
"
                  >
                    {item.name}
                  </h2>

                  <p
                    className="
text-gray-300
mt-2
"
                  >
                    Quantity: {item.quantity}
                  </p>

                  <p
                    className="
text-green-400
font-bold
mt-1
"
                  >
                    €{item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
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

          <Link
            to="/checkout"
            className="
inline-block
mt-8

bg-green-600
hover:bg-green-500

px-6
py-3

rounded-xl

font-semibold

transition
"
          >
            Checkout
          </Link>
        </>
      )}
    </div>
  );
}
