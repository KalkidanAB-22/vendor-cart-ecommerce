import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <CartProvider>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />
        <Home />
      </div>
    </CartProvider>
  );
}