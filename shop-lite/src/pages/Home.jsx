import { useEffect, useState } from "react";

import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";


export default function Home() {

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {

    async function fetchProducts() {

      try {

        const url = `${import.meta.env.VITE_API_URL}/products`;

        console.log("Fetching:", url);


        const response = await fetch(url);


        if (!response.ok) {
          throw new Error(
            `API Error: ${response.status}`
          );
        }


        const data = await response.json();


        if (Array.isArray(data)) {

          setProducts(data);

        } else {

          throw new Error(
            "Invalid product data received"
          );

        }


      } catch (err) {

        console.error(
          "Product loading error:",
          err
        );

        setError(
          "Unable to load products"
        );


      } finally {

        setLoading(false);

      }

    }


    fetchProducts();


  }, []);



  const filteredProducts = products.filter((product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  if (loading) {

    return (
      <div className="text-center mt-10">
        Loading products...
      </div>
    );

  }



  if (error) {

    return (
      <div className="text-center mt-10 text-red-500">
        {error}
      </div>
    );

  }



  return (

    <div>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />


      <ProductGrid
        products={filteredProducts}
      />


    </div>

  );

}