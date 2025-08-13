import { NavLink, useLocation } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

function Navbar({ cardData }) {
  const location = useLocation();
  const navRef = useRef(null);
  const togglerRef = useRef(null);
  const menuRef = useRef(null);

  const [lastProductId, setLastProductId] = useState(() =>
    localStorage.getItem("lastProductId")
  );

  useEffect(() => {
    setLastProductId(localStorage.getItem("lastProductId"));
  }, [location]);

  //navbar在滑動往下時變實心白
  useEffect(() => {
    const nav = navRef.current;

    ScrollTrigger.create({
      start: 20,
      onEnter: () => {
        nav.classList.add("bg-white");
      },
      onLeaveBack: () => {
        nav.classList.remove("bg-white");
      },
    });

    return () => ScrollTrigger.kill();
  }, []);

  // 點擊外部關閉漢堡菜單
  useEffect(() => {
    const handleClickOutside = (e) => {
      // 如果點擊的是 navbar toggler 按鈕，不處理（讓 Bootstrap 自己處理）
      if (e.target.closest(".navbar-toggler")) {
        return;
      }

      // 如果點擊的是 navbar 內部的其他元素，不處理
      if (navRef.current && navRef.current.contains(e.target)) {
        return;
      }

      // 檢查菜單是否打開
      const isOpen = menuRef.current?.classList.contains("show");

      if (isOpen && togglerRef.current) {
        // 觸發 Bootstrap 的 collapse 關閉
        togglerRef.current.click();
      }
    };

    // 使用 mousedown 而不是 click，避免與 Bootstrap 的事件衝突
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="navbar navbar-expand-lg navbar-light pe-md-5 ps-md-5 pe-3 ps-3 fixed-top nav-glass bg-gradient"
        style={{
          "--bs-gradient":
            "linear-gradient(180deg, rgb(255, 255, 255) 0%,rgb(255, 255, 255, 0.5) 50%,rgb(255, 255, 255, 0.1) 85%, rgba(255,255,255,0) 100%)",
        }}
      >
        <NavLink
          to="/"
          className="navbar-brand hover-float"
          style={{
            backgroundImage: `url(${
              import.meta.env.BASE_URL
            }img/logo-black.png)`,
            height: 70,
            width: 150,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <h1 style={{ position: "absolute", left: "-9999px" }}>
            Studio Mellow
          </h1>
        </NavLink>

        <button
          ref={togglerRef}
          className="navbar-toggler"
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
          ref={menuRef}
          className="collapse navbar-collapse justify-content-end ms-auto"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `nav-item nav-link me-5 hover-float ${
                  isActive ? "text-dark" : "text-black-50"
                }`
              }
            >
              首頁
            </NavLink>
            <NavLink
              to="/products"
              end
              className={({ isActive }) =>
                `nav-item nav-link me-5 hover-float ${
                  isActive ? "text-dark" : "text-black-50"
                }`
              }
            >
              藝術傑作
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
                <span
                  className="position-absolute top-1 start-15 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "8px" }}
                >
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
