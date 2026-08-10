import { Outlet, useLocation } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  const location = useLocation();

  const minimalRoutes = ["/checkout", "/payment"];

  const isMinimal = minimalRoutes.some((route) =>
    location.pathname.startsWith(route),
  );

  return (
    <div className="min-h-screen flex flex-col">
      {isMinimal ? <Navbar minimal /> : <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      {!isMinimal && <Footer />}
    </div>
  );
}
