import axios from "axios";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useOutletContext } from "react-router-dom";

function CouponModal({ mode }) {
  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm({
    defaultValues: {
      title: "",
      is_enabled: 0,
      percent: 0,
      due_date: "",
      code: "",
    },
  });

  const { cpPage, setCpPage, fetchCoupon, setMessage } = useOutletContext();

  const navigate = useNavigate();
  const { state } = useLocation();

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
    if (mode === "edit" && state?.coupon) {
      reset(state.coupon);
    }
  }, [mode]);

  //發送表單
  const onSubmit = async (data) => {
    const payload = {
      ...data,
      is_enabled: Number(data.is_enabled),
      percent: Number(data.percent),
      due_date: Math.floor(new Date(data.due_date).getTime() / 1000),//調整日期格式
    };
    if (mode === "edit") {//判斷是不是編輯
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/v2/api/${
            import.meta.env.VITE_API_PATH
          }/admin/coupon/${state.coupon.id}`,
          { data: payload }
        );
        const msg = res.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
      } catch (err) {
        const msg = err.response.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
      }
      navigate(`/dashboard/coupon-list?page=${cpPage}`);
    } else {
      try {//更新優惠券資料
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/v2/api/${
            import.meta.env.VITE_API_PATH
          }/admin/coupon`,
          { data: payload }
        );
        const msg = res.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
        await fetchCoupon(cpPage);
        setCpPage(1);
        navigate(`/dashboard/coupon-list?page=${cpPage}`);
      } catch (err) {
        const msg = err?.response?.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
      }
    }
  };

  //更新日期資料不重新 render
  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="modal fade  show d-block"
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="false"
      onClick={handleOverlayClick}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              建立新優惠券
            </h1>
            <button
              type="button"
              onClick={() => {
                closeForm();
              }}
              className="btn-close"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="mb-2">
              <label className="w-100" htmlFor="title">
                標題
                <input
                  type="text"
                  id="title"
                  placeholder="請輸入標題"
                  {...register("title", {
                    required: "標題必填",
                    validate: (value) => {
                      const onlyZh = /^[\u4e00-\u9fa5]+$/.test(value);
                      const onlyEn = /^[A-Za-z]+$/.test(value);

                      if (onlyZh && value.length > 8) {
                        return "中文標題最多 8 個字";
                      }
                      if (onlyEn && value.length > 20) {
                        return "英文標題最多 20 個字母";
                      }
                      if (!onlyZh && !onlyEn) {
                        return "僅限純中文或純英文";
                      }
                      return true;
                    },
                  })}
                  className="form-control mt-1"
                />
              </label>
              {errors.title && (
                <p className="text-red-600 text-danger small">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="percent">
                  折扣（%）
                  <input
                    type="number"
                    {...register("percent", {
                      required: "折扣必填",
                      min: { value: 0, message: "不得低於 0%" },
                      max: { value: 100, message: "不得高於 100%" },
                    })}
                    id="percent"
                    placeholder="請輸入折扣（%）"
                    className="form-control mt-1"
                  />
                </label>
                {errors.percent && (
                  <p className="text-red-600 text-danger small">
                    {errors.percent.message}
                  </p>
                )}
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="due_date">
                  到期日
                  <input
                    type="date"
                    id="due_date"
                    min={today}
                    {...register("due_date", { required: "到期日必填" })}
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                  />
                </label>
                {errors.due_date && (
                  <p className="text-red-600 text-danger small">
                    {errors.due_date.message}
                  </p>
                )}
              </div>
              <div className="col-md-6 mb-2">
                <label className="w-100" htmlFor="code">
                  優惠碼
                  <input
                    type="text"
                    id="code"
                    {...register("code", {
                      required: "優惠碼必填",
                      maxLength: { value: 4, message: "最多 5 個字母" },
                      pattern: {
                        value: /^[A-Za-z]+$/,
                        message: "僅限英文字母",
                      },
                    })}
                    placeholder="請輸入優惠碼"
                    className="form-control mt-1"
                  />
                </label>
                {errors.code && (
                  <p className="text-red-600 text-danger small">
                    {errors.code.message}
                  </p>
                )}
              </div>
            </div>
            <label className="form-check-label" htmlFor="is_enabled">
              <input
                className="form-check-input me-2"
                type="checkbox"
                id="is_enabled"
                value={1}
                {...register("is_enabled", {
                  setValueAs: (v) => (v ? 1 : 0),
                })}
              />
              是否啟用
            </label>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                closeForm();
              }}
            >
              關閉
            </button>
            <button type="submit" className="btn btn-primary">
              儲存
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CouponModal;
