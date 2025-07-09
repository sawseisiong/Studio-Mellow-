import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate,useOutletContext } from "react-router-dom";

function Checkout() {
  const [orderList, setOrderList] = useState([]);
  const { setCartData } = useOutletContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const navigate = useNavigate();

  //送出客戶表單
  const onSubmit = async (formData) => {
    const data = {
      data: {
        user: {
          name: formData.name,
          email: formData.email,
          tel: formData.tel,
          address: formData.address,
        },
        message: formData.message,
      },
    };
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/order`,
        data
      );
      await setCartData({});
      console.log("scss", res);
      // await clearCart()
      navigate("/success", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  //清空購物車
  const clearCart = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/carts`
      );
      console.log("delete", res);
    } catch (err) {
      console.log(err);
    }
  };

  //顯示訂購產品數
  const orderItems = async (item) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/cart`
      );
      console.log(res.data.data);
      setOrderList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    orderItems();
  }, []);

  return (
    <>
      <div className="row justify-content-center pt-5 mt-5 mx-3 mb-3">
        <div className="col-md-10">
          <h3 className="fw-bold mb-1 pt-3">結帳資訊 / 完成您的訂單</h3>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-center pb-5 mb-5 mx-3" >
        <div className="col-md-4">
          <div className="border p-4 mb-4">
            {orderList?.carts?.map((order) => {
              return (
                <div className="d-flex mb-3">
                  <img
                    src={
                      order?.product?.imageUrl || order?.product?.imagesUrl?.[0]
                    }
                    alt="產品圖片"
                    className="me-2"
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{order.product.title}</p>
                      <p className="mb-0">{`NT$${order.product.price}`}</p>
                    </div>
                    <p className="mb-0 fw-bold">{`x${order.qty}`}</p>
                  </div>
                </div>
              );
            })}

            <table className="table mt-4 border-top border-bottom text-muted">
              <tbody>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-4 font-weight-normal"
                  >
                    小計
                  </th>
                  <td className="text-end border-0 px-0 pt-4">{`NT$${orderList.final_total}`}</td>
                </tr>
                <tr>
                  <th
                    scope="row"
                    className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                  >
                    付款方式
                  </th>
                  <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-between mt-4">
              <p className="mb-0 h4 fw-bold">總金額</p>
              <p className="mb-0 h4 fw-bold">{`NT$${orderList.final_total}`}</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p>聯絡資訊 / 收件人資料</p>
            <div className="mb-0">
              <label htmlFor="ContactMail" className="text-muted mb-0">
                Email
              </label>

              <input
                type="email"
                id="ContactMail"
                {...register("email", {
                  required: "email必填",
                  pattern: {
                    value: /^[a-zA-Z0-9](\.?[a-zA-Z0-9]){5,29}@gmail\.com$/,
                    message: "僅限有效的 Gmail 帳號",
                  },
                })}
                placeholder="請輸入email"
                className="form-control mb-4"
              />
              {errors.email && (
                <span className="text-red-600 text-danger small">
                  {errors.email.message}
                </span>
              )}
            </div>
            <label htmlFor="ContactAddress" className="text-muted mb-0">
              Shipping address
            </label>
            <div className="mb-3">
              <input
                type="text"
                id="ContactAddress"
                {...register("address", {
                  required: "運輸地址必填",
                  minLength: { value: 5, message: "地址過短" },
                  maxLength: { value: 100, message: "地址長度不可超過 100 字" },
                  pattern: {
                    value: /^[A-Za-z0-9\u4e00-\u9fa5#\-\s,]{5,100}$/,
                    message: "請輸入正確的地址格式",
                  },
                })}
                placeholder="請輸入運輸地址"
                className="form-control "
              />
              {errors.address && (
                <span className="text-red-600 text-danger small">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="text-muted mb-0">
                Name
              </label>

              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "姓名必填",
                  validate: (value) => {
                    const zh = /^[\u4e00-\u9fa5]{2,4}$/;
                    const en = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
                    return zh.test(value) || en.test(value)
                      ? true
                      : "請輸入 2–4 個中文字或 2–40 個英文名字母";
                  },
                })}
                placeholder="請輸入姓名"
                className="form-control"
              />
              {errors.name && (
                <span className="text-red-600 text-danger small">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="ContactPhone" className="text-muted mb-0">
                Phone
              </label>

              <input
                type="text"
                id="ContactPhone"
                {...register("tel", {
                  required: "電話必填",
                  pattern: {
                    value:
                      /^(09\d{2}[-]?\d{3}[-]?\d{3}|0\d{1,2}[-]?\d{3,4}[-]?\d{3,4})$/,
                    message: "請輸入正確的台灣電話號碼",
                  },
                })}
                placeholder="請輸入電話"
                className="form-control"
              />
              {errors.tel && (
                <span className="text-red-600 text-danger small">
                  {errors.tel.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="ContactMessage" className="text-muted mb-0">
                Message
              </label>
              <textarea
                className="form-control"
                rows="3"
                id="ContactMessage"
                placeholder="message ... "
              ></textarea>
            </div>
            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between  align-items-md-center align-items-end  w-100">
              <button
                className="text-dark mt-md-0 mt-3 btn"
                onClick={() => {
                  navigate(-1);
                }}
              >
                <i className="fas fa-chevron-left me-2"></i> 回到上一頁
              </button>
              <button type="submit" className="btn btn-dark py-1 px-5">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default Checkout;
