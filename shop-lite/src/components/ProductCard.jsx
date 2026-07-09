import { useCart } from "../context/CartContext";
import images from "../images";

export default function ProductCard({ product }) {
   console.log("PRODUCT DATA:", product);
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">

      {/* IMAGE */}
      <div className="h-52 overflow-hidden bg-gray-100">
      
         <img
  src={images[product.image]}
  alt={product.name}
  className="w-full h-full object-cover hover:scale-105 transition duration-300"
/>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        
        <h2 className="font-semibold text-gray-800 text-lg">
          {product.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Premium Quality Product
        </p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-bold text-black">
            €{product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}