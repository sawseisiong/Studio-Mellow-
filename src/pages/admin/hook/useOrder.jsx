import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useOrder({ setMessage, odPage, setOdPage }) {
  const [orderData, setOrderData] = useState([]);//訂單資料
  const [pageInfo, setPageInfo] = useState({ total_pages: 1 });//訂單總頁碼


  //刪除圖片  刪除後抓「同一頁」
  const deleteOrder = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/order/${id}`
      );
      const msg = res.data;
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev // 相同就跳過
          : { success: msg.success, message: msg.message }
      );
      await fetchOrder(odPage);
    } catch (err) {
      const msg = err?.response?.data;
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev // 相同就跳過
          : { success: msg.success, message: msg.message }
      );
    }

    if (pageInfo.total_pages === 1) {
      fetchOrder(odPage - 1);
    }
  };

  //render 出所有產品
  const fetchOrder = useCallback(async (p = 1) => {
    try {
      p = Math.max(1, p);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/orders?page=${p}`
      );

      const allProduct = res?.data?.orders ?? [];
      setOrderData(allProduct);
      setPageInfo(res.data.pagination);
      setOdPage(p);
    } catch (err) {
      const msg = err?.response?.data ?? {
        success: false,
        message: "無法取得訂單資料",
      };
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev
          : { success: msg.success, message: msg.message }
      );
    }
  }, [setMessage, setOdPage]);


  //結束 form 後 render 出產品
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    fetchOrder(odPage);
  }, [fetchOrder,odPage]);

  return {
    deleteOrder,
    orderData,
    pageInfo,
    setPageInfo,
    fetchOrder,
  };
}
