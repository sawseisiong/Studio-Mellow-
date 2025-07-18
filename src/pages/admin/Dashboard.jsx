import { Link, Outlet, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import axios from "axios";
import { useEffect ,useState} from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [message, setMessage] = useState({ success: false, message: "" }); //跨元件訊息

  //如果無夾帶 token 則返回 login 頁
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    axios.defaults.headers.common["Authorization"] = token;
    (async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/v2/api/user/check`); //檢查 token 是否正確
      } catch (err) {
        navigate("/login", { replace: true });
      }
    })();
  }, []);

  //登出
  const logOut = async () => {
    sessionStorage.removeItem("token");
    await axios.post(`${import.meta.env.VITE_API_URL}/v2/logout`);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark ">
        <Message message={message} setMessage={setMessage} />
        <div className="container-fluid">
          <p className="text-white mb-0">STUDIO MELLOW 後台管理系統</p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item ">
                <button
                  type="button"
                  className="btn btn-sm btn-light mx-2"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  切換電商前台
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light"
                  onClick={logOut}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="d-flex" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="bg-light" style={{ width: "200px" }}>
          <ul className="list-group list-group-flush">
            <Link
              className="list-group-item list-group-item-action py-3"
              to="product-list"
            >
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </Link>
            <Link
              to="coupon-list"
              className="list-group-item list-group-item-action py-3"
            >
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠券列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="orders-list"
            >
              <i className="bi bi-receipt me-2" />
              訂單列表
            </Link>
          </ul>
        </div>
        <div className="w-100">
          <Outlet
            context={{
              message,
              setMessage,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
