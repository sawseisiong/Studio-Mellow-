import { Outlet, Link ,useLocation} from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function FrontLayout() {
  const [cartData, setCartData] = useState({});//購物車圖示｜加入購物車數｜購物車資訊
  const location = useLocation()

  const hideFooter = location.pathname == "/success"//如果 location 在 success，就隱藏 footer

  //取得購物車資料
  const getCart = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/cart`
    );
    setCartData(res.data.data);

  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Navbar cardData={cartData} />
      <Outlet context={{ getCart, cartData, setCartData }} />

     {!hideFooter && <div className="bg-dark py-5">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
            <Link className="text-white h4" to="">
              <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="logo" style={{ height: 50 }} />
            </Link>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white mx-3">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a href="#" className="text-white ms-3">
                  <i className="fab fa-line"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
            <div className="mb-md-0 mb-1">
              <p className="mb-0">
                客服專線｜02-3456-7890（週一-週五 09:00-18:00）
              </p>
              <p className="mb-0">客服信箱｜studio@mail.com</p>
            </div>
            <p className="mb-0">© 2025 Studio Mellow 版權所有｜All Rights Reserved.</p>
          </div>
        </div>
      </div>}
    </>
  );
}

export default FrontLayout;
