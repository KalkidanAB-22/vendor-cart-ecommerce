const API_URL = import.meta.env.VITE_API_URL;


export async function getProducts(search = "") {

  const response = await fetch(
    `${API_URL}/products?search=${search}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}