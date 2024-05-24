import "./RootLayout.scss";
import { Outlet, useLocation } from "react-router-dom";
import { NewsLetter } from "@components/ecommerce/sections";
import { Breadcrumb, Footer, Navbar } from "@components/layout";

function RootLayout() {
  const location = useLocation();
  return (
    <div className="app">
      <Navbar />
      {location.pathname !== "/" && <Breadcrumb />}
      <Outlet />
      <NewsLetter />
      <Footer />
    </div>
  );
}

export default RootLayout;
