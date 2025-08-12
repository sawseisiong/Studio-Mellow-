import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function IsLoading() {
  return (
    <div className=" position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-50">
      <DotLottieReact
        src="https://lottie.host/e032d208-f692-4e76-9d25-897221cc7486/9NQXyDbJDo.lottie"
        autoplay
        loop={true}
        speed={3}
        style={{ width: 250, height: 250, zIndex: 999 }}
      />
    </div>
  );
}
