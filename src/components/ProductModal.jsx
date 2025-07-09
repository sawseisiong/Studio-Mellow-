import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductModal({ mode, dbPage, setDbPage, message, setMessage }) {
  const [uploadImage, setUploadImage] = useState([]); //上傳圖片後出現小圖示預覽
  const { state } = useLocation(); 
  const [remoteImages, setRemoteImages] = useState( //上傳圖片到後端的 State
    state?.product?.imagesUrl || []
  );

  //產品類別分類
  const categories = [
    "場景系列",
    "3D 系列",
    "電繪系列",
    "明信片系列",
    "手繪系列",
    "水果系列",
    "動物系列",
    "繪本系列",
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,

  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      origin_price: 0,
      price: 0,
      unit: "",
      description: "",
      content: "",
      is_enabled: 0,
      imageUrl: "",
      imagesUrl: [],
    },
  });

  const navigate = useNavigate();

  //編輯商品，自動填入商品信息
  useEffect(() => {
    if (mode === "edit" && state?.product) { //判斷是不是在編輯模式
      reset(state.product);
      setUploadImage(state.product.imagesUrl || []);
    }
  }, [mode, state, reset]);

  //發送表單打 API
  const onSubmit = async (data) => {
    const enabled = data.is_enabled ? 1 : 0;

    const payload = { ...data, imagesUrl: remoteImages, is_enabled: enabled };
    if (mode === "edit") {
      try {
        const res = await axios.put(
          `${import.meta.env.VITE_API_URL}/v2/api/${
            import.meta.env.VITE_API_PATH
          }/admin/product/${state.product.id}`,
          { data: payload }
        );
        
        //顯示更新成功的 Message
        const msg = res.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
      } catch (err) {
        //顯示更新失敗的 Message
        const msg = err.response.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
      }
      navigate(`/dashboard?page=${dbPage}`); //更新後回到當前頁面
    } else {
      try {
        const res = await axios.post( //新增商品
          `${import.meta.env.VITE_API_URL}/v2/api/${
            import.meta.env.VITE_API_PATH
          }/admin/product`,
          { data: payload }
        );
        //顯示新增成功的 Message
        const msg = res.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
        navigate(`/dashboard?page=${dbPage}`);
      } catch (err) {
        //顯示新增失敗的 Message
        const msg = err?.response?.data;
        setMessage((prev) =>
          prev.success === msg.success && prev.message === msg.message
            ? prev // 相同就跳過
            : { success: msg.success, message: msg.message }
        );
      }

      reset();//更新完後重置表單
      setDbPage(1);//回道頁碼 1
      navigate(`/dashboard?page=${dbPage}`); //更新後回到第一頁
    }
  };

 
  //關閉表單
  const closeForm = () => {
    navigate(-1);
  };

  //點擊表單外，關閉表單
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      navigate(-1);
    }
  };

  const imageUrl = watch("imageUrl");
  const imageFile = watch("imageFile");

  //上傳圖片

  const uploadFile = async (e) => {
    const file = e.target.files?.[0];
    const fd = new FormData();
    fd.append("file-to-upload", file);

    const localURL = URL.createObjectURL(file);
    setUploadImage((pre) => [...pre, localURL]);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/admin/upload`,
      fd
    );
    const remoteUrl = res.data.imageUrl;
    setRemoteImages([...remoteImages, remoteUrl]);
    console.log("有沒有上傳圖片");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        onClick={handleOverlayClick}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                建立新商品
              </h1>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeForm}
              />
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="image">
                      輸入圖片網址
                      <input
                        type="text"
                        {...register("imageUrl", {
                          validate: (value) => {
                            if (!value && !uploadImage?.[0]) {
                              return "請上傳圖片或填入圖片網址";
                            }
                            return true;
                          },
                        })}
                        id="image"
                        placeholder="請輸入圖片連結"
                        className="form-control"
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="customFile">
                      或 上傳圖片
                      <input
                        type="file"
                        id="customFile"
                        {...register("imageFile", {
                          validate: (value) => {
                            if (!value && !uploadImage?.[0]) {
                              return "請上傳圖片或填入圖片網址";
                            }
                            return true;
                          },
                        })}
                        className="form-control"
                        onChange={uploadFile}
                      />
                    </label>
                    {errors.imageUrl && (
                      <p className="text-red-600 text-danger small">
                        {errors.imageUrl.message}
                      </p>
                    )}
                  </div>

                  <div className="row g-2">
                    {uploadImage.map((img, i) => {
                      return (
                        <div className="col-6" key={i}>
                          {console.log("uploadImage", uploadImage)}{" "}
                          <img
                            src={img}
                            alt={`預覽${i}`}
                            className="img-fluid object-fit-cover ratio ratio-1x1 rounded"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="title">
                      標題
                      <input
                        type="text"
                        id="title"
                        {...register("title", {
                          required: "名稱必填",
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
                        placeholder="請輸入標題"
                        className="form-control"
                      />
                    </label>
                    {errors.title && (
                      <p className="text-red-600 text-danger small">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="category">
                        分類
                        <select
                          id="category"
                          {...register("category", { required: "分類必填" })}
                          defaultValue=""
                          className="form-control "
                        >
                          <option value="" disabled>
                            請選擇分類
                          </option>
                          {categories.map((c) => {
                            return <option key={c}>{c}</option>;
                          })}
                        </select>
                      </label>
                      {errors.category && (
                        <p className="text-red-600 text-danger small">
                          {errors.category.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="unit">
                        單位
                        <input
                          type="unit"
                          id="unit"
                          {...register("unit", { required: "單位必填" })}
                          placeholder="請輸入單位"
                          className="form-control"
                        />
                      </label>
                      {errors.unit && (
                        <p className="text-red-600 text-danger small">
                          {errors.unit.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="origin_price">
                        原價
                        <input
                          type="number"
                          id="origin_price"
                          {...register("origin_price", {
                            required: "原價必填",
                            valueAsNumber: true,
                            min: { value: 0, message: "不得為負數" },
                          })}
                          placeholder="請輸入原價"
                          className="form-control"
                        />
                      </label>
                      {errors.origin_price && (
                        <p className="text-red-600 text-danger small">
                          {errors.origin_price.message}
                        </p>
                      )}
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label className="w-100" htmlFor="price">
                        售價
                        <input
                          type="number"
                          id="price"
                          {...register("price", {
                            required: "售價必填",
                            valueAsNumber: true,
                            min: { value: 0, message: "不得為負數" },
                          })}
                          placeholder="請輸入售價"
                          className="form-control"
                        />
                      </label>
                      {errors.price && (
                        <p className="text-red-600 text-danger small">
                          {errors.price.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="description">
                      產品描述
                      <textarea
                        type="text"
                        id="description"
                        {...register("description", {
                          required: "產品描述必填",
                          maxLength: { value: 300, message: "不得超過 300 字" },
                        })}
                        placeholder="請輸入產品描述"
                        className="form-control"
                      />
                    </label>
                    {errors.description && (
                      <p className="text-red-600 text-danger small">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group mb-2">
                    <label className="w-100" htmlFor="content">
                      說明內容
                      <textarea
                        type="text"
                        id="content"
                        {...register("content", {
                          maxLength: { value: 300, message: "不得超過 300 字" },
                        })}
                        placeholder="請輸入產品說明內容"
                        className="form-control"
                      />
                    </label>
                    {errors.description && (
                      <p className="text-red-600 text-danger small">
                        {errors.content.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group mb-2">
                    <div className="form-check">
                      <label
                        className="w-100 form-check-label"
                        htmlFor="is_enabled"
                      >
                        是否啟用
                        <input
                          type="checkbox"
                          id="is_enabled"
                          value={1}
                          {...register("is_enabled", {
                            setValueAs: (v) => (v ? 1 : 0),
                          })}
                          placeholder="請輸入產品說明內容"
                          className="form-check-input"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={closeForm}
                className="btn btn-secondary"
              >
                關閉
              </button>
              <button type="submit" className="btn btn-primary">
                儲存
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProductModal;
