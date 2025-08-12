import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

function OrderModal({ mode }) {
  const { fetchOrder } = useOutletContext();
  const [isPaid, setPaid] = useState(undefined); //is_paid 打勾的訊息
  const navigate = useNavigate();
  const { state } = useLocation();
  const order = state?.order || {};
  const [status, setStatus] = useState(0); //運送進度
  const { handleSubmit, reset } = useForm({});

  //點擊 form 外圍，關閉表單
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const closeForm = () => {
    navigate(-1);
  };

  //編輯優惠券，自動填上之前的資料
  useEffect(() => {
    if (mode === "edit" && state?.order) {
      reset(state.order);
    }
  }, [mode]);

  //送出表單
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      is_paid: isPaid,
      status,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/order/${order.id}`,
        { data: payload }
      );
      await fetchOrder();
      navigate(-1); //關閉表單
    } catch {
      alert("系統發生錯誤，請稍後再試");
    }
  };

  //判斷後端裡的order.is_paid是否打勾
  useEffect(() => {
    if (order.is_paid !== undefined) {
      setPaid(order.is_paid);
    }
  }, [order.is_paid]);

  //判斷後端裡的外送進度
  useEffect(() => {
    if (order.status !== undefined) {
      setStatus(order.status);
    }
  }, [status]);

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      id="orderModal"
      aria-labelledby="exampleModalLabel"
      onClick={handleOverlayClick}
    >
      <form className="modal-dialog modal-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {`編輯 ${order.id}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => {
                closeForm();
              }}
            />
          </div>
          <div className="modal-body">
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">Email</span>
              <div className="col-sm-10">
                <input
                  type="email"
                  readOnly
                  className="form-control-plaintext"
                  id="staticEmail"
                  defaultValue={order?.user?.email}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">訂購者</span>
              <div className="col-sm-10">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  id="staticEmail"
                  defaultValue={order?.user?.name}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">外送地址</span>
              <div className="col-sm-10">
                <input
                  type="text"
                  readOnly
                  className="form-control-plaintext"
                  defaultValue={order?.user?.address}
                />
              </div>
            </div>
            <div className="mb-3 row">
              <span className="col-sm-2 col-form-label">留言</span>
              <div className="col-sm-10">
                <textarea
                  name=""
                  id=""
                  cols="30"
                  readOnly
                  className="form-control-plaintext"
                  defaultValue={order.message}
                />
              </div>
            </div>
            {order.products && (
              <table className="table">
                <thead>
                  <tr>
                    <th>品項名稱</th>
                    <th>數量</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(order.products).map((cart) => (
                    <tr key={cart.id}>
                      <td>{cart.product.title}</td>
                      <td>{cart.qty}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="border-0 text-end">總金額</td>
                    <td className="border-0">${order.total}</td>
                  </tr>
                </tfoot>
              </table>
            )}

            <div>
              <h5 className="mt-4">修改訂單狀態</h5>
              <div className="form-check mb-4">
                <label className="form-check-label" htmlFor="is_paid">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="is_paid"
                    id="is_paid"
                    checked={isPaid}
                    onChange={(e) => setPaid(e.target.checked)}
                  />
                  付款狀態 ({order.is_paid ? "已付款" : "未付款"})
                </label>
              </div>
              <div className="mb-4">
                <span className="col-sm-2 col-form-label d-block">
                  外送進度
                </span>
                <select
                  className="form-select"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value={0}>未確認</option>
                  <option value={1}>已確認</option>
                  <option value={2}>外送中</option>
                  <option value={3}>已送達</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              關閉
            </button>
            <button type="submit" className="btn btn-primary">
              儲存
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OrderModal;
