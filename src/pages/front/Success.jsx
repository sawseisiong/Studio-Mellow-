import { Link } from "react-router-dom";

function Success() {
  return (
    <div className="position-relative d-flex">
      <div
        className="container d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        <div className="row my-auto pb-7 ">
          <div className="col-md-4 d-flex flex-column  p-5">
            <div
              className="my-auto text-white text-shadow"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <h3 className="hover-float">這幅畫，正在回家的路上</h3>
              <p className="hover-float">
                謝謝你選擇了我們的小作品， 願它成為你生活裡的小小確幸
              </p>
              <Link to="/" className="btn btn-light mt-4 px-5 hover-float">
                回到首頁
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="w-md-50 w-100 position-absolute opacity-1 bg-success"
        style={{
          zIndex: "-1",
          minHeight: "100vh",
          right: "0",
          // backgroundImage: "url('/img/success.png')",
          backgroundPosition: "center center",
          backgroundSize: "contain cover",
         
        }}
      ></div>
    </div>
  );
}

export default Success;
