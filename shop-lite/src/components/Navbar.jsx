import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white sticky top-0 z-50">
      <h1 className="text-xl font-bold text-gray-800">
        🛒 MiniShop
      </h1>

      <div className="relative">
        <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition">
          Cart
        </button>

        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>
      </div>
    </nav>
  );
}