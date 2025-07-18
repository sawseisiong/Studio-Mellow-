import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

export default function useCoupon({ setMessage,cpPage, setCpPage  }) {
  const [couponsData, setCouponData] = useState([]);//優惠券資料
  const [pageInfo, setPageInfo] = useState({ total_pages: 1 });//總頁碼


  //刪除後抓「同一頁」
  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/coupon/${id}`
      );
      const msg = res.data;
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev // 相同就跳過
          : { success: msg.success, message: msg.message }
      );
      await fetchCoupon(cpPage);
    } catch (err) {
      const msg = err?.response?.data;
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev // 相同就跳過
          : { success: msg.success, message: msg.message }
      );
    }

    if (pageInfo.total_pages === 1) {
      fetchCoupon(cpPage - 1);
    }
  };

  //render 出所有產品
  const fetchCoupon = useCallback(async (p = 1) => {
    try {
      p = Math.max(1, p);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/admin/coupons?page=${p}`
      );

      const allProduct = res?.data?.coupons ?? [];
      setCouponData(allProduct);
      setPageInfo(res.data.pagination);
      setCpPage(p);
    } catch (err) {
      const msg = err?.response?.data ?? {
        success: false,
        message: "無法取得優惠券資料",
      };
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev
          : { success: msg.success, message: msg.message }
      );
    }
  }, [setMessage, setCpPage]);


  //結束 form 後 render 出產品
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    fetchCoupon(cpPage);
  }, [fetchCoupon,cpPage]);

  return {
    deleteCoupon,
    couponsData,
    pageInfo,
    setPageInfo,
    fetchCoupon,
  };
}
