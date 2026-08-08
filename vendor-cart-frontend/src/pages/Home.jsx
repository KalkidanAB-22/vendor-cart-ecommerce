import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import CategoryFilter from "../components/CategoryFilter";
import Skeleton from "../components/Skeleton";

import api from "../api/client";

export default function Home() {
  const [categories, setCategories] = useState([]);

  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const data = await api(`/products?search=${search}`);

        setProducts(data);
      } catch (err) {
        setError("Unable to load products");
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await api("/categories");

        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    }

    loadCategories();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "" || product.category_id == category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div
        className="
      px-6
      py-10
      grid
      grid-cols-1
      sm:grid-cols-2
      md:grid-cols-3
      lg:grid-cols-4
      gap-6
      "
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="
            glass
            rounded-2xl
            p-4
            "
          >
            <Skeleton
              className="
              h-52
              w-full
              mb-4
              "
            />

            <Skeleton
              className="
              h-5
              w-3/4
              mb-3
              "
            />

            <Skeleton
              className="
              h-4
              w-1/2
              mb-5
              "
            />

            <Skeleton
              className="
              h-10
              w-full
              "
            />
          </div>
        ))}
      </div>
    );
  }

  if (error)
    return (
      <h1
        className="
text-center
mt-20
text-red-400
"
      >
        {error}
      </h1>
    );

  return (
    <div
      className="
max-w-7xl
mx-auto
px-4
py-8
"
    >
      <SearchBar search={search} setSearch={setSearch} />

      <CategoryFilter
        categories={categories}
        selected={category}
        setSelected={setCategory}
      />

      <ProductGrid products={filteredProducts} />
    </div>
  );
}
