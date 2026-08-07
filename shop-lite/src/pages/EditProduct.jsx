import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/client";

export default function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image_url: "",
    category_id: "",
    sku: "",
    brand: "",
    stock: "",
  });

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await api(`/products/${id}`);

        setForm({
          name: data.name || "",

          price: data.price || "",

          description: data.description || "",

          image_url: data.image_url || "",

          category_id: data.category_id || "",

          sku: data.sku || "",

          brand: data.brand || "",

          stock: data.stock || "",
        });
      } catch (error) {
        console.error(error);
      }
    }

    loadProduct();
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await api(`/products/${id}`, {
        method: "PUT",

        body: JSON.stringify({
          ...form,

          price: Number(form.price),

          category_id: Number(form.category_id),

          stock: Number(form.stock),
        }),
      });

      alert("Product updated successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error(error);

      alert(error.message);
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
        "
      >
        Edit Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="
        glass
        rounded-3xl
        p-6
        space-y-5
        "
      >
        {Object.keys(form).map((field) =>
          field === "description" ? (
            <textarea
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              className="
            w-full
            p-3
            rounded-xl

            bg-black/40

            border
            border-white/20

            text-white

            placeholder-gray-400

            outline-none

            focus:ring-2
            focus:ring-green-500

            "
            />
          ) : (
            <input
              key={field}
              name={field}
              value={form[field]}
              onChange={handleChange}
              placeholder={field}
              className="
            w-full
            p-3
            rounded-xl

            bg-black/40

            border
            border-white/20

            text-white

            placeholder-gray-400

            outline-none

            focus:ring-2
            focus:ring-green-500

            "
            />
          ),
        )}

        <button
          className="
          w-full

          bg-green-600

          hover:bg-green-500

          py-3

          rounded-xl

          font-semibold

          transition

          "
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
