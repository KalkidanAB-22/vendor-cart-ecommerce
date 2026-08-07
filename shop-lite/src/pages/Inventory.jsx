import { useEffect, useState } from "react";
import api from "../api/client";

export default function Inventory() {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    try {
      const data = await api("/products");

      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-8">Manage Inventory</h1>

      <div
        className="
grid
md:grid-cols-3
gap-6
"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="
glass
rounded-3xl
p-5
"
          >
            <img
              src={product.image_url}
              alt={product.name}
              className="
h-48
w-full
object-cover
rounded-2xl
"
            />

            <h2 className="font-bold text-xl mt-4">{product.name}</h2>

            <p className="text-gray-400">Brand: {product.brand}</p>

            <p className="text-green-400 font-bold">${product.price}</p>

            <p>
              Stock:
              <span className="ml-2">{product.stock}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
