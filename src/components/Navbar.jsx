import { NavLink, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from "react";

function Navbar({ cardData }) {
  //抓到最後一次商品到id，並在點擊detail分頁的時候，到該產品分頁
  const location = useLocation();
  const [lastProductId, setLastProductId] = useState(() =>
    localStorage.getItem("lastProductId")
  );

  useEffect(() => {
    setLastProductId(localStorage.getItem("lastProductId"));
  }, [location]);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light pe-md-5 ps-md-5 pe-3 ps-3 fixed-top nav-glass bg-gradient"
        style={{
          "--bs-gradient":
            "linear-gradient(180deg, rgba(255,255,255,.6), rgba(255,255,255,0))",
        }}
      >
        <NavLink
          to="/"
          className="navbar-brand hover-float"
          style={({ isActive }) => ({
            backgroundImage: isActive
              ? "url('/img/logo-white.png')"
              : "url('/img/logo-black.png')",
            height: 80,
            width: 150,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          })}
        >
          <h1 style={{ position: "absolute", left: "-9999px" }}>
            Studio Mellow
          </h1>
        </NavLink>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end ms-auto"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav ">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `nav-item nav-link me-4 hover-float ${
                  isActive ? "text-dark" : "text-black-50"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                `nav-item nav-link me-4 hover-float ${
                  isActive ? "text-dark" : "text-black-50"
                }`
              }
            >
              Product
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-item nav-link me-4 hover-float ${
                  isActive ? "text-dark" : "text-black-50"
                }${!lastProductId ? "disabled" : ""}`
              }
              to={lastProductId ? `/products/${lastProductId}` : "#"}
            >
              Detail
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `nav-item nav-link position-relative hover-float ${
                  isActive ? "text-dark" : "text-black-50"
                }`
              }
              to="cart"
            >
              <i className="bi bi-cart-dash-fill"></i>
              {cardData?.carts?.length ? (
                <span className="position-absolute top-0 start-15 translate-middle badge rounded-pill bg-danger ">
                  {cardData?.carts?.length}
                  <span className="visually-hidden">unread messages</span>
                </span>
              ) : (
                ""
              )}
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
