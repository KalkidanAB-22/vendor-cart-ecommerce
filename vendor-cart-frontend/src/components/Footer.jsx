export default function Footer() {
  return (
    <footer
      className="
      mt-20
      bg-black/50
      backdrop-blur-xl
      border-t
      border-white/10
      "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-6
        py-10

        grid
        md:grid-cols-3
        gap-8
        "
      >
        {/* Brand */}

        <div>
          <h2
            className="
            text-2xl
            font-bold
            text-white
            "
          >
            Vendor Cart
          </h2>

          <p
            className="
            text-gray-400
            mt-3
            "
          >
            A modern ecommerce platform built for simple and secure shopping.
          </p>
        </div>

        {/* Links */}

        <div>
          <h3
            className="
            text-white
            font-semibold
            mb-3
            "
          >
            Quick Links
          </h3>

          <div
            className="
            space-y-2
            text-gray-400
            "
          >
            <p>Home</p>

            <p>Products</p>

            <p>Orders</p>

            <p>Profile</p>
          </div>
        </div>

        {/* Contact */}

        <div>
          <h3
            className="
            text-white
            font-semibold
            mb-3
            "
          >
            Contact
          </h3>

          <p className="text-gray-400">support@vendorcart.com</p>

          <p className="text-gray-400 mt-2">Addis Ababa, Ethiopia</p>
        </div>
      </div>

      <div
        className="
        border-t
        border-white/10
        text-center
        py-5
        text-gray-500
        "
      >
        © {new Date().getFullYear()} Vendor Cart. All rights reserved.
      </div>
    </footer>
  );
}
