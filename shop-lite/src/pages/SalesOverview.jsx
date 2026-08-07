import { useEffect, useState } from "react";

import api from "../api/client";

export default function SalesOverview() {
  const [data, setData] = useState(null);

  async function loadSales() {
    try {
      const result = await api("/sales/overview");

      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadSales();
  }, []);

  if (!data) {
    return (
      <div
        className="
max-w-7xl
mx-auto
px-4
py-10
grid
grid-cols-1
md:grid-cols-3
gap-6
"
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="
glass
h-32
rounded-3xl
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
      <h1
        className="
        text-3xl
        font-bold
        mb-8
        "
      >
        Sales Overview
      </h1>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
        mb-8
        "
      >
        <StatCard title="Revenue" value={`€${data.revenue}`} />

        <StatCard title="Orders" value={data.orders} />

        <StatCard title="Customers" value={data.customers} />
      </div>

      <div
        className="
        glass
        rounded-3xl
        p-6
        "
      >
        <h2
          className="
          text-xl
          font-bold
          mb-5
          "
        >
          Best Selling Products
        </h2>

        <div className="space-y-3">
          {data.bestProducts.map((product, index) => (
            <div
              key={index}
              className="
            flex
            justify-between
            items-center
            p-4
            rounded-xl
            bg-white/5
            border
            border-white/10
            "
            >
              <span
                className="
              font-medium
              "
              >
                {product.name}
              </span>

              <span
                className="
              text-green-400
              font-bold
              "
              >
                {product.sold} sold
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      className="
glass
rounded-3xl
p-6
"
    >
      <p
        className="
text-gray-400
"
      >
        {title}
      </p>

      <h2
        className="
text-3xl
font-bold
mt-2
text-green-400
"
      >
        {value}
      </h2>
    </div>
  );
}
