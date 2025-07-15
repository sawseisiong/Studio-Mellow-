import { useState, useEffect } from "react";
import App from "../App";
import IsLoading from "./IsLoading";

export default function AppWrapper() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const imgs = Array.from(document.images);

    const imgPromises = imgs.map((img) => {
      return img.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
            img.addEventListener("load", resolve);
            img.addEventListener("error", resolve); // 失敗也別卡死
          });
    });

    Promise.all(imgPromises).then(() => setReady(true));
  }, []);

  return ready?<App/>:<IsLoading/>
}
