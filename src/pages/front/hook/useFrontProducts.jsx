import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export default function useFrontProducts() {
  const [productsData, setProductsData] = useState([]);
  const [pdPage, setPdPage] = useState(1);
  const [pdCtgPage, setPdCtgPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({ total_pages: 1 });
  const [active, setActive] = useState("");

  //render 出所有產品
  const fetchProducts = useCallback(
    //如果是在產品分類的時候，點下頁面就只跳分類的下一頁

    async (p = 1) => {
      console.log("active", active);
      console.log("pdCtgPage", pdCtgPage);
      if (active) {
        fetchCategory(pdCtgPage, active);
        return;
      }
      if (p <= 0) {
        p = 1;
      }
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/products?page=${p}`
      );

      setPdPage(res.data.pagination.current_page);
      setPageInfo(res.data.pagination.total_pages);
      console.log("pageInfo1111", pageInfo);
      const allProduct = res?.data?.products ?? {};
      setProductsData(Object.values(allProduct));
    },
    [pdPage, active]
  );

  useEffect(() => {
    fetchProducts(pdPage);
  }, []);

  //系列分類
  const fetchCategory = async (p, category = active) => {
    if (p <= 0) {
      p = 1;
    }
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/products?page=${p}&category=${category}`
    );

    console.log("fetchCategory", res);
    console.log("category", category);
    setPdCtgPage(res.data.pagination.current_page);
    setPageInfo(res.data.pagination.total_pages);
    const allProduct = res?.data?.products ?? {};
    setProductsData(Object.values(allProduct));
  };

  return {
    productsData,
    setProductsData,
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
  };
}
