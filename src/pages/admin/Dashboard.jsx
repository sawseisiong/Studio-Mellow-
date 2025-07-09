import { Link, Outlet, useNavigate } from "react-router-dom";
import Message from "../../components/Message";
import axios from "axios";
import { useEffect } from "react";

function Dashboard({
  dbPage,
  setDbPage,
  cpPage,
  setCpPage,
  message,
  setMessage,
  odPage,
  setOdPage,
}) {
  const navigate = useNavigate();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      navigate("/login", { replace: true });
      return
    }
    (async () => {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/v2/api/user/check`);
      } catch (err) {
        if (!err.response.data.success) {
          navigate("/login", { replace: true });
          console.log(err);
        console.log("err.response.data.success", err.response.data.success);
        }
        
      }
    })()
  }, []);

  const logOut = async () => {
    console.log("logOut");
    localStorage.removeItem("token");
    await axios.post(`${import.meta.env.VITE_API_URL}//v2/logout`);

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
                  onClick={()=>{navigate("/")}}
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
              to="productlist"
            >
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </Link>
            <Link
              to="couponlist"
              className="list-group-item list-group-item-action py-3"
            >
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="orderslist"
            >
              <i className="bi bi-receipt me-2" />
              訂單列表
            </Link>
          </ul>
        </div>
        <div className="w-100">
          <Outlet
            context={{
              cpPage,
              setCpPage,
              dbPage,
              setDbPage,
              odPage,
              setOdPage,
              
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
