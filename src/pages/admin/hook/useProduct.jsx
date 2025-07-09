import { useState, useEffect, useCallback } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function useProduct({ setMessage }) {
  const [productsData, setProductsData] = useState([]);
  const location = useLocation();
  const [pageInfo, setPageInfo] = useState({ total_pages: 1 });
  const { dbPage, setDbPage } = useOutletContext();

  //刪除圖片  刪除後抓「同一頁」；若這頁沒資料就退回上一頁
  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/product/${id}`
      );
      await fetchProducts(dbPage);

      const msg = res.data;
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev // 相同就跳過
          : { success: msg.success, message: msg.message }
      );
    } catch (err) {
      const msg = err?.response?.data;

      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev // 相同就跳過
          : { success: msg.success, message: msg.message }
      );
    }

    if (pageInfo.total_pages === 1) {
      fetchProducts(dbPage - 1);
    }
  };

  //render 出所有產品
  const fetchProducts = useCallback(
    async (p = 1) => {
      if (p <= 0) {
        p = 1;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/products?page=${p}`
      );
      const allProduct = res?.data?.products ?? {};
      setProductsData(Object.values(allProduct));
      setPageInfo(res.data.pagination);
      setDbPage(p);
    },
    [dbPage]
  );

  //結束 form 後 render 出產品
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    fetchProducts(dbPage);
  }, [fetchProducts, location]);

  return {
    deleteProduct,
    productsData,
    pageInfo,

    setPageInfo,
    fetchProducts,
  };
}
