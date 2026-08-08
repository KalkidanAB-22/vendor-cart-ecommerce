import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!Array.isArray(products)) {
    return (
      <p
        className="
      text-red-400
      text-center
      mt-10
      "
      >
        Products data error
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-60
        "
      >
        <p
          className="
          text-gray-300
          text-lg
          "
        >
          No products found 😢
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      px-2
      sm:px-4
      lg:px-6
      py-8
      "
    >
      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        xl:grid-cols-4
        gap-6
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
