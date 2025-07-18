import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import IsLoading from "../../components/IsLoading";

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [txtCoupon, setTxtCoupon] = useState(""); //優惠券文字
  const [coupon, setCoupon] = useState({}); //優惠券資料
  const [isLoading, setIsLoading] = useState(false); //載入 API Loading
  const [couponErr, setCouponErr] = useState(false);

  //移除購物車商品
  const removeCart = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/cart/${id}`
      );
      console.log(res);
      getCart(); //重新取得購物車資料
    } catch (err) {
      console.log(err);
    }
  };

  //更新購物車資料
  const updateCartItem = async (item, qty) => {
    setIsLoading(true);
    try {
      const data = {
        data: {
          product_id: item.product_id,
          qty: qty,
        },
      };
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/cart/${item.id}`,
        data
      );
      console.log(res);
      getCart(); //重新取得購物車資料
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  //使用優惠券
  const useCoupon = async (cou) => {
    try {
      const data = {
        data: {
          code: cou,
        },
      };
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/coupon`,
        data
      );

      setCoupon(res);
      getCart(); //重新取得購物車資料
      setCouponErr(false);
    } catch (err) {
      setCouponErr(true);
      console.log(err);
    }
  };

  // useEffect(()=>{
  //   const getCoupon =async()=>{
  //     try{
  //       const res= await axios.get(`${import.meta.env.VITE_API_URL}/v2/api/${
  //         import.meta.env.VITE_API_PATH
  //       }/admin/coupons?page=1`)
  //       console.log('coupon res',res)
  //     }catch(err){
  //       console.log(err)
  //     }
  //   }

  // },[])

  //載入購物車資料時跑 loading 畫面
  useEffect(() => {
    if (!("carts" in cartData)) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [cartData]);

  const handleCouponInput = (e) => {
    const v = e.target.value;
    setTxtCoupon(v);
    if (v.trim() === "") setCouponErr(false);
  };

  return (
    <div>
      {isLoading && <IsLoading />}
      {cartData?.carts?.length === 0 ? (
        <div
          style={{
            position: "fixed",
            zIndex: "100",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
          }}
        >
          <div
            className="position-fixed top-0 start-0 w-100 h-100
    d-flex justify-content-center align-items-center
    bg-white bg-opacity-75"
          >
            <div
              className="card text-center "
              data-aos="zoom-in"
              style={{ width: "30rem" }}
            >
              <div className="card-body py-5">
                <h5 className="card-title">購物車目前還沒靈感的身影</h5>
                <p className="card-text">去賣場尋找讓你心動的插畫作品吧！</p>
                <Link to="/products" className="btn btn-primary">
                  開始探索
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="mx-5 my-5 py-5 ">
        <h3 className="mt-3 mb-4">購物明細</h3>
        <div className="row">
          <div className="col-md-8">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="border-0 ps-0">
                    商品資訊
                  </th>
                  <th scope="col" className="border-0">
                    數量
                  </th>
                  <th scope="col" className="border-0">
                    小計
                  </th>
                  <th scope="col" className="border-0"></th>
                </tr>
              </thead>

              <tbody>
                {cartData?.carts?.map((item) => {
                  return (
                    <tr className="border-bottom border-top" key={item.id}>
                      <th
                        scope="row"
                        className="border-0 px-0 font-weight-normal py-4"
                      >
                        <Link to={`/products/${item.product.id}`}>
                          <img
                            src={
                              item?.product?.imageUrl ||
                              item?.product?.imagesUrl?.[0]
                            }
                            alt="產品圖片"
                            style={{
                              width: "72px",
                              height: "72px",
                              objectFit: "cover",
                            }}
                          />
                          <p className="mb-0 fw-bold ms-3 d-inline-block">
                            {item.product.title}
                          </p>
                        </Link>
                      </th>
                      <td
                        className="border-0 align-middle"
                        style={{ maxWidth: "160px" }}
                      >
                        <div className="input-group pe-5">
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-dark border-0 py-2"
                              type="button"
                              id="button-addon1"
                              onClick={() => {
                                const newQty = item.qty - 1;
                                if (item.qty === 1) return;
                                updateCartItem(item, newQty);
                              }}
                            >
                              <i className="bi bi-dash"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            className="form-control border-0 text-center my-auto shadow-none"
                            placeholder=""
                            aria-label="Example text with button addon"
                            aria-describedby="button-addon1"
                            value={item.qty}
                            readOnly
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-dark border-0 py-2"
                              type="button"
                              id="button-addon2"
                              onClick={() => {
                                const newQty = item.qty + 1;
                                updateCartItem(item, newQty);
                              }}
                            >
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="border-0 align-middle ">
                        <p className=" ms-auto ">{`NT$${item.total}`}</p>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="border-0 align-middle btn"
                          onClick={() => removeCart(item.id)}
                        >
                          <i className="bi bi-x "></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="input-group w-50 mb-3">
              <input
                type="text"
                className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                placeholder="輸入優惠券 SXEK"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                defaultValue={txtCoupon}   
                onBlur={handleCouponInput}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                  type="button"
                  id="button-addon2"
                  onClick={() => {
                    useCoupon(txtCoupon);
                  }}
                >
                  <div className="bounce-loop">
                    <i className="bi bi-ticket-perforated-fill"></i>
                  </div>
                </button>
              </div>
            </div>
            {couponErr && (
              <span className="text-danger small">無此優惠碼</span>
            )}
          </div>
          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="fw-bold mb-4">訂單明細</h4>
              <table className="table text-muted border-bottom">
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-4 font-weight-normal"
                    >
                      小計
                    </th>
                    <td className="text-end border-0 px-0 pt-4">{`NT$${cartData.total}`}</td>
                  </tr>

                  <tr>
                    <th
                      scope="row"
                      className="border-0 px-0 pt-0 pb-4 font-weight-normal"
                    >
                      付款方式
                    </th>
                    <td className="text-end border-0 px-0 pt-0 pb-4">
                      ApplePay
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="d-flex justify-content-between mt-4 align-items-center">
                <div className="d-flex flex-column align-items-start">
                  <p className="pt-4 h4 fw-bold ">總金額</p>

                  <p className="text-muted fw-light mt-1 small">
                    {coupon?.data?.message}
                  </p>
                </div>
                <div className="d-flex flex-column align-items-end">
                  <p className="mb-0 h4 fw-bold">
                    {coupon && `NT$${cartData.final_total}`}
                  </p>
                  <p className="mb-0 h5 fw-bold">
                    {coupon?.data?.message && (
                      <del className="fw-light fs-5">NT${cartData.total}</del>
                    )}
                  </p>
                </div>
              </div>

              <Link to="/checkout" className="btn btn-dark w-100 mt-4">
                前往結帳
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
