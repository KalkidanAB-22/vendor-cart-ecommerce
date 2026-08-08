import { useEffect, useState } from "react";
import api from "../api/client";

export default function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInventory() {
      try {
        const response = await api("/products");

        console.log("Inventory response:", response);

        setProducts(response.products || response || []);
      } catch (error) {
        console.error("Failed loading inventory:", error.message);

        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadInventory();
  }, []);

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
        text-white
        "
      >
        Loading inventory...
      </div>
    );
  }

  return (
    <div
      className="
      min-h-screen
      bg-slate-950
      text-white
      p-8
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Inventory Management
      </h1>

      <div
        className="
        bg-white/10
        backdrop-blur-xl
        border
        border-white/10
        rounded-2xl
        p-6
        "
      >
        <table className="w-full">
          <thead>
            <tr
              className="
              text-left
              text-gray-300
              border-b
              border-white/10
              "
            >
              <th className="p-4">Product</th>

              <th className="p-4">Category</th>

              <th className="p-4">Price</th>

              <th className="p-4">Stock</th>

              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="
                  text-center
                  p-8
                  text-gray-400
                  "
                >
                  No products available
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="
                  border-b
                  border-white/10
                  hover:bg-white/5
                  transition
                  "
                >
                  <td className="p-4">{product.name}</td>

                  <td className="p-4">{product.category?.name || "N/A"}</td>

                  <td className="p-4">${product.price}</td>

                  <td className="p-4">{product.stock ?? 0}</td>

                  <td className="p-4">
                    {product.stock > 0 ? (
                      <span
                        className="
                        bg-green-500/20
                        text-green-400
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        "
                      >
                        In Stock
                      </span>
                    ) : (
                      <span
                        className="
                        bg-red-500/20
                        text-red-400
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        "
                      >
                        Out of Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
