import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { productSchema } from "../validation/productSchema";

import api from "../api/client";

export default function AddProduct() {
  const navigate = useNavigate();

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),

    defaultValues: {
      name: "",
      price: "",
      brand: "",
      sku: "",
      stock: "",
      category_id: "",
      image_url: "",
      description: "",
    },
  });

  async function onSubmit(data) {
    setSaving(true);

    setError("");

    try {
      await api("/products", {
        method: "POST",

        body: JSON.stringify({
          ...data,

          price: Number(data.price),

          category_id: Number(data.category_id),

          stock: Number(data.stock),
        }),
      });

      alert("Product created successfully");

      navigate("/admin/products");
    } catch (error) {
      console.error("Create product error:", error);

      setError(error.message);
    } finally {
      setSaving(false);
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
        text-white
        "
      >
        Add Product
      </h1>

      {error && (
        <div
          className="
            mb-5
            bg-red-500/20
            border
            border-red-500
            text-red-300
            p-3
            rounded-lg
            "
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        glass
        rounded-3xl
        p-6
        space-y-5
        "
      >
        <Input placeholder="Product name" register={register("name")} />

        <Error message={errors.name?.message} />

        <Input placeholder="Price" register={register("price")} />

        <Error message={errors.price?.message} />

        <Input placeholder="Brand" register={register("brand")} />

        <Error message={errors.brand?.message} />

        <Input placeholder="SKU" register={register("sku")} />

        <Error message={errors.sku?.message} />

        <Input placeholder="Stock quantity" register={register("stock")} />

        <Error message={errors.stock?.message} />

        <Input placeholder="Image URL" register={register("image_url")} />

        <Error message={errors.image_url?.message} />

        <Input placeholder="Category ID" register={register("category_id")} />

        <Error message={errors.category_id?.message} />

        <textarea
          placeholder="Product description"
          {...register("description")}
          className="
          w-full
          p-3
          rounded-xl
          bg-black/40
          border
          border-white/20
          text-white
          outline-none
          focus:ring-2
          focus:ring-green-500
          "
        />

        <Error message={errors.description?.message} />

        <button
          disabled={saving}
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
          {saving ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

function Input({ placeholder, register }) {
  return (
    <input
      placeholder={placeholder}
      {...register}
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
  );
}

function Error({ message }) {
  if (!message) return null;

  return (
    <p
      className="
text-red-400
text-sm
"
    >
      {message}
    </p>
  );
}
