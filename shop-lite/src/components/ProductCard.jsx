import { useCart } from "../context/CartContext";

import headphones from "../assets/headphones.png";
import laptopPro from "../assets/laptop-pro.png";
import nikeAirMax from "../assets/nike-air-max.png";
import nikeShoes from "../assets/nike-shoes.png";
import hero from "../assets/hero.png";

const images = {
  headphones,
  laptopPro,
  nikeAirMax,
  nikeShoes,
  hero,
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const productImage = product.image_url || images[product.image] || hero;

  return (
    <div
      className="
      glass
      rounded-2xl
      overflow-hidden
      flex
      flex-col
      hover:-translate-y-2
      transition
      duration-300
      "
    >
      <div
        className="
        h-52
        overflow-hidden
        bg-black/20
        "
      >
        <img
          src={
            product.image_url || "https://placehold.co/600x600?text=No+Image"
          }
          alt={product.name}
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
          Premium Quality Product
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
