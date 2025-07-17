import { useState, useEffect, useCallback } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function useProduct({ setMessage,dbPage, setDbPage }) {
  const [productsData, setProductsData] = useState([]);//商品資料
  const location = useLocation();
  const [pageInfo, setPageInfo] = useState({ total_pages: 1 });//總頁碼


  //刪除圖片  刪除後回到「同一頁」
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
    
    //刪完最後一筆資料後，如果目前這一頁已經變成空頁，就自動回到上一頁
    if (pageInfo.total_pages === 1) {
      fetchProducts(dbPage - 1);
    }
  };

  //render 出所有產品
  const fetchProducts = useCallback(async (p = 1) => {
    try {
      p = Math.max(1, p);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/products?page=${p}`
      );
      const allProduct = res?.data?.products ?? [];
      setProductsData(allProduct);
      setPageInfo(res.data.pagination);
      setDbPage(p);
    } catch (err) {
      const msg = err?.response?.data ?? {
        success: false,
        message: "無法取得產品資料",
      };
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev
          : { success: msg.success, message: msg.message }
      );
    }
  }, [setMessage, setDbPage]);

  //結束 form 後 render 出產品,夾帶 token 重載不登出
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    fetchProducts(dbPage);
  }, [fetchProducts, location,dbPage]);

  return {
    deleteProduct,
    productsData,
    pageInfo,
    setPageInfo,
    fetchProducts,
  };
}
