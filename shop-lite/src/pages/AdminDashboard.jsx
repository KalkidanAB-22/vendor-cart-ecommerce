import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const cards = [
    ["Manage Products", "/admin/products", "green"],

    ["Manage Inventory", "/admin/inventory", "emerald"],

    ["Manage Orders", "/admin/orders", "blue"],

    ["Sales Overview", "/admin/sales", "purple"],
  ];

  return (
    <div
      className="
max-w-7xl
mx-auto
px-5
py-10
"
    >
      <h1
        className="
text-4xl
font-bold
mb-8
"
      >
        Admin Dashboard
      </h1>

      <div
        className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
"
      >
        {cards.map((card) => (
          <Link
            key={card[1]}
            to={card[1]}
            className="
glass
rounded-2xl
p-6
hover:-translate-y-2
transition
"
          >
            <h2
              className="
text-xl
font-semibold
"
            >
              {card[0]}
            </h2>

            <p
              className="
text-gray-300
mt-3
"
            >
              Manage your store
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
