const API_URL = import.meta.env.VITE_API_URL;

export async function createProduct(product, token) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) throw new Error((await response.json()).message);
  return response.json();
}
