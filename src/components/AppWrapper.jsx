import { useState, useEffect } from "react";
import App from "../App";
import IsLoading from "./IsLoading";

export default function AppWrapper() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
      const imgs = Array.from(document.images);           
      if (imgs.length === 0) {                            
        setReady(true);
        return;
      }
  
      const promises = imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            })
      );
  
      Promise.all(promises).then(() => setReady(true));
    }, []);
  
    return (
      <>
        <App />                 {/* 無論 ready 與否都先插進 DOM */}
        {!ready && <IsLoading />}   {/* Loader 以 fixed / z-index 蓋最上層 */}
      </>
    );
  }
