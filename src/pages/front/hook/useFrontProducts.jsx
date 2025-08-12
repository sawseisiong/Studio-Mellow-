import { useState, useEffect, useCallback } from "react";
import axios from "axios";

// 讓外部可傳入初始分類與頁碼，避免載入頁面時先顯示全部商品
export default function useFrontProducts(initCategory = "", initPage = 1) {
  const [productsData, setProductsData] = useState([]); // 商品資料
  const [pdPage, setPdPage] = useState(1); // 全部商品頁碼
  const [pdCtgPage, setPdCtgPage] = useState(initPage); // 分類商品頁碼
  const [pageInfo, setPageInfo] = useState({ total_pages: 1 }); // 總頁碼數
  const [active, setActive] = useState(initCategory); // 目前分類
  const [isLoading, setIsLoading] = useState(false); //載入 API Loading

  // 取得所有商品
  const fetchProducts = useCallback(
    async (p = 1) => {
      const currentActive = active;
      if (p <= 0) p = 1;
      setIsLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/products?page=${p}`
      );
      // 若抓取過程中分類已變動，忽略此次結果
      if (currentActive !== active) {
        setIsLoading(false);
        return;
      }
      setPdPage(res.data.pagination.current_page); //設定當前頁碼
      setPageInfo(res.data.pagination.total_pages); //設定總頁碼數
      const allProduct = res?.data?.products ?? {};
      setProductsData(Object.values(allProduct));
      setIsLoading(false);
    },
    [active]
  );

  // 根據目前分類狀態決定要抓取全部商品還是指定分類
  useEffect(() => {
    if (active) {
      fetchCategory(pdCtgPage, active);
    } else {
      fetchProducts(pdPage);
    }
  }, [active, pdPage, pdCtgPage, fetchProducts]);

  //呼叫商品分類
  const fetchCategory = async (p, category = active) => {
    if (p <= 0) {
      p = 1;
    }
    setIsLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/products?page=${p}&category=${category}`
    );

    setPdCtgPage(res.data.pagination.current_page); //設定當前分類頁碼
    setPageInfo(res.data.pagination.total_pages); //設定當前總分類頁數
    const allProduct = res?.data?.products ?? {};
    setProductsData(Object.values(allProduct)); //更新商品 state 資料
    setIsLoading(false);
  };

  return {
    productsData,
    pdPage,
    setPdPage,
    pdCtgPage,
    setPdCtgPage,
    pageInfo,
    setPageInfo,
    active,
    setActive,
    fetchCategory,
    fetchProducts,
    isLoading,
  };
}
