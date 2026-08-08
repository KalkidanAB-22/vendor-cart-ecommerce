import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import Skeleton from "../components/Skeleton";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  async function fetchProducts() {
    try {
      const data = await api("/products");

      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Products error:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  async function deleteProduct(id) {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    try {
      await api(`/products/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleFeatured(id) {
    try {
      await api(`/products/${id}/feature`, {
        method: "PATCH",
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }

  async function toggleStatus(id) {
    try {
      await api(`/products/${id}/status`, {
        method: "PATCH",
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div
        className="
max-w-7xl
mx-auto
px-4
py-10
space-y-4
"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="
glass
h-20
rounded-2xl
animate-pulse
bg-white/10
"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className="
      max-w-7xl
      mx-auto
      px-4
      py-10
      "
    >
      <div
        className="
        flex
        flex-col
        sm:flex-row
        justify-between
        gap-5
        mb-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Product Management
        </h1>

        <Link
          to="/admin/products/add"
          className="
          bg-green-600
          hover:bg-green-500
          px-5
          py-3
          rounded-xl
          font-semibold
          transition
          text-center
          "
        >
          + Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div
          className="
          glass
          rounded-2xl
          p-8
          text-center
          text-gray-300
          "
        >
          No products available
        </div>
      ) : (
        <div
          className="
        glass
        rounded-3xl
        overflow-hidden
        "
        >
          <div
            className="
      overflow-x-auto
      "
          >
            <table
              className="
        w-full
        min-w-[700px]
        "
            >
              <thead
                className="
        bg-white/10
        "
              >
                <tr>
                  <th className="p-4 text-left">Name</th>

                  <th className="p-4">Price</th>

                  <th className="p-4">Stock</th>

                  <th className="p-4">Status</th>

                  <th className="p-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="
        border-t
        border-white/10
        "
                  >
                    <td
                      className="
      p-4
      font-semibold
      "
                    >
                      {product.name}
                    </td>

                    <td className="p-4 text-green-400">€{product.price}</td>

                    <td className="p-4">{product.stock ?? 0}</td>

                    <td className="p-4">
                      <span
                        className={
                          product.active ? "text-green-400" : "text-red-400"
                        }
                      >
                        {product.active ? "Active" : "Hidden"}
                      </span>
                    </td>

                    <td
                      className="
        p-4
        space-x-2
        "
                    >
                      <button
                        onClick={() => toggleFeatured(product.id)}
                        className="
      bg-yellow-500/20
      text-yellow-300
      px-3
      py-2
      rounded-lg
      "
                      >
                        ⭐
                      </button>

                      <button
                        onClick={() => toggleStatus(product.id)}
                        className="
      bg-blue-600
      px-3
      py-2
      rounded-lg
      "
                      >
                        Status
                      </button>

                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="
      bg-green-600
      px-3
      py-2
      rounded-lg
      inline-block
      "
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="
      bg-red-600
      px-3
      py-2
      rounded-lg
      "
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
