import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import ProductModal from "./components/ProductModal";
import ProductList from "./pages/admin/ProductList";
import CouponList from "./pages/admin/CouponList";
import CouponModal from "./components/CouponModal";
import OrdersList from "./pages/admin/OrdersList";
import OrderModal from "./components/OrderModal";
import FrontLayout from "./pages/front/FrontLayout";
import Home from "./pages/front/Home";
import Products from "./pages/front/Products";
import ProductDetail from "./pages/front/ProductDetail";
import Cart from "./pages/front/Cart";
import Checkout from "./pages/front/Checkout";
import Success from "./pages/front/Success";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  AOS.init(); //初始化 AOS 套件

  return (
    <>
      <Routes>
        <Route element={<FrontLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="products">
            <Route index element={<Products />} />
            <Route path=":id" element={<ProductDetail />} />
          </Route>
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/dashboard"
          // 讓 Dashboard 把各頁碼和跨元件訊息傳到子 Route
          element={<Dashboard />}
        >
          <Route index element={<Navigate to="product-list" replace />} />
          <Route path="product-list" element={<ProductList />}>
            <Route
              path="product-modal"
              element={<ProductModal mode="create" />}
            />
            <Route
              path="product-modal/:id"
              element={<ProductModal mode="edit" />}
            />
          </Route>
          <Route path="coupon-list" element={<CouponList />}>
            <Route
              path="coupon-modal"
              element={<CouponModal mode="create" />}
            />
            <Route
              path="coupon-modal/:id"
              element={<CouponModal mode="edit" />}
            />
          </Route>
          <Route path="orders-list" element={<OrdersList />}>
            <Route path="order-modal" element={<OrderModal mode="create" />} />
            <Route
              path="order-modal/:id"
              element={<OrderModal mode="edit" />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
