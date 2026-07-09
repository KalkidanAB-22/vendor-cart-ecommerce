import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!Array.isArray(products)) {
    return <p className="text-red-500 text-center">Products data error</p>;
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <p className="text-gray-500">No products found 😢</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}