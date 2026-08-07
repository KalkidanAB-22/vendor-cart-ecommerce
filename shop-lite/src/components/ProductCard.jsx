import { useCart } from "../context/CartContext";

import hero from "../assets/hero.png";

const images = {
  hero,
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const productImage = product.image_url || images[product.image] || hero;

  return (
    <div
      className="
      bg-white/10
      backdrop-blur-xl
      border
      border-white/10
      rounded-2xl
      overflow-hidden
      hover:scale-[1.02]
      transition
      duration-300
      flex
      flex-col
      "
    >
      {/* IMAGE */}

      <div
        className="
        h-64
        overflow-hidden
        "
      >
        <img
          src={productImage}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = hero;
          }}
          className="
          w-full
          h-full
          object-cover
          hover:scale-110
          transition
          duration-500
          "
        />
      </div>

      {/* CONTENT */}

      <div
        className="
        p-5
        flex
        flex-col
        flex-1
        "
      >
        <h2
          className="
          text-xl
          font-bold
          text-white
          "
        >
          {product.name}
        </h2>

        <p
          className="
          text-gray-300
          text-sm
          mt-2
          "
        >
          {product.description || "Premium Quality Product"}
        </p>

        <div
          className="
          mt-auto
          flex
          justify-between
          items-center
          pt-5
          "
        >
          <span
            className="
            text-green-400
            font-bold
            text-lg
            "
          >
            €{product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="
            bg-green-600
            hover:bg-green-500
            px-4
            py-2
            rounded-xl
            text-white
            transition
            "
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
