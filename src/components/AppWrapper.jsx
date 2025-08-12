import { useState, useEffect } from "react";
import App from "../App";
import IsLoading from "./IsLoading";

export default function AppWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const imgs = Array.from(document.images); // 取得頁面中所有 <img> 元素
    if (imgs.length === 0) {
      // 若頁面中沒有圖片，直接標記為 ready
      setReady(true);
      return;
    }

    const promises = imgs.map(
      (
        img // 為每張圖片建立一個 promise，等它載入或出錯
      ) =>
        img.complete // 若已載入就直接 resolve
          ? Promise.resolve()
          : new Promise((resolve) => {
              // 載入完成或錯誤都視為結束，避免卡住
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
    );

    Promise.all(promises).then(() => setReady(true)); // 等所有圖片都完成載入後，才切換為 ready
  }, []);

  return (
    <>
      <App /> {/* 無論 ready 與否都先插進 DOM */}
      {!ready && <IsLoading />} {/* Loader 以 fixed / z-index 蓋最上層 */}
    </>
  );
}
