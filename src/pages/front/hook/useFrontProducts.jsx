import { useState, useEffect, useCallback } from "react";
import axios from "axios";


export default function useFrontProducts() {
  const [productsData, setProductsData] = useState([]); //商品資料
  const [pdPage, setPdPage] = useState(1); //當前商品頁碼
  const [pdCtgPage, setPdCtgPage] = useState(1); //當前 分類 產品頁碼
  const [pageInfo, setPageInfo] = useState({ total_pages: 1 }); //總頁碼數
  const [active, setActive] = useState(""); //產品分類（用來點擊更新）
  const [isLoading, setIsLoading] = useState(false); //載入 API Loading

  //render 出所有產品
  const fetchProducts = async (p = 1) => {
    //如果是在產品分類的時候，點下頁面就只跳分類的下一頁
    if (active) {
      fetchCategory(pdCtgPage, active);
      return;
    }
    if (p <= 0) {
      p = 1;
    }
    setIsLoading(true)
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/products?page=${p}`
    );
    setPdPage(res.data.pagination.current_page); //設定當前頁碼
    setPageInfo(res.data.pagination.total_pages);//設定總頁碼數
    console.log("pageInfo", pageInfo);
    const allProduct = res?.data?.products ?? {};
    setProductsData(Object.values(allProduct));//更新商品 state 資料
    setIsLoading(false)
  };

  useEffect(() => {
    fetchProducts(pdPage);
  }, [pdPage, active]);

  //呼叫商品分類
  const fetchCategory = async (p, category = active) => {
    if (p <= 0) {
      p = 1;
    }
    setIsLoading(true)
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/products?page=${p}&category=${category}`
    );

    setPdCtgPage(res.data.pagination.current_page);//設定當前分類頁碼
    setPageInfo(res.data.pagination.total_pages);//設定當前總分類頁數
    const allProduct = res?.data?.products ?? {};
    setProductsData(Object.values(allProduct));//更新商品 state 資料
    setIsLoading(false)
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
    isLoading
  };
}
