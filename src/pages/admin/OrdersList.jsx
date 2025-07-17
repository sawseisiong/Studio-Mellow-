import { Link, useOutletContext, Outlet } from "react-router-dom";
import useOrder from "./hook/useOrder";
import { useState } from "react";

function OrdersList() {
  const { message, setMessage } = useOutletContext();//傳入頁碼和跨元件訊息
  const [odPage, setOdPage] = useState(1); //後台｜商品訂購頁碼
  const { orderData, pageInfo, fetchOrder } = useOrder({ message, setMessage,odPage, setOdPage });

  return (
    <div className="p-3">
      <Outlet context={{ odPage,setOdPage, fetchOrder }} />
      <h3>訂單列表</h3>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">訂單 id</th>
            <th scope="col">購買用戶</th>
            <th scope="col">訂單金額</th>
            <th scope="col">付款狀態</th>
            <th scope="col">付款日期</th>
            <th scope="col">留言訊息</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.user?.name}
                  {order.user?.email}
                </td>
                <td>${order.total}</td>
                <td>
                  {order.is_paid ? (
                    <span className="text-success fw-bold">付款完成</span>
                  ) : (
                    "未付款"
                  )}
                </td>
                <td>
                  {order.paid_date
                    ? new Date(order.paid_date * 1000).toLocaleString()
                    : "未付款"}
                </td>
                <td>{order.message}</td>

                <td>
                  <Link
                    type="button"
                    className="btn btn-primary btn-sm"
                    to="order-modal"
                    state={{ order }}
                  >
                    查看
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${odPage === 1 ? "disabled" : ""}`}>
            <Link
              to={`?page=${odPage - 1}`}
              className="page-link"
              href="/"
              aria-label="Previous"
              onClick={() => fetchOrder(odPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>

          {[...Array(pageInfo.total_pages)].map((_, i) => (
            <li className="page-item" key={`${i}_page`}>
              <Link
                to={`?page=${i + 1}`}
                className={`page-link ${odPage === i + 1 ? "active" : ""}`}
                href="/"
                onClick={() => {
                  fetchOrder(i + 1);
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          <li
            className={`page-item ${
              odPage === pageInfo.total_pages ? "disabled" : ""
            }`}
          >
            <Link
              to={`?page=${odPage + 1}`}
              className="page-link"
              href="/"
              aria-label="Next"
              onClick={() => fetchOrder(odPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default OrdersList;
