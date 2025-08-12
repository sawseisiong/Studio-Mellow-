import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div>
        <div className="position-relative d-flex">
          <div
            className="container d-flex flex-column"
            style={{ minHeight: "100vh" }}
          >
            <div className="row my-auto mx-auto pb-7 ">
              <div className="d-flex flex-column">
                <div
                  className="my-auto text-white text-shadow d-flex flex-column "
                  data-aos="fade-up"
                  data-aos-duration="1000"
                >
                  <h1 className="hover-float" style={{ fontSize: "160px" }}>
                    404
                  </h1>
                  <p className="hover-float fs-5 text-center">
                    畫家靈感枯竭中...
                  </p>
                  <p className="hover-float text-center">
                    他現在正窩在角落，痛哭流涕地抱著畫筆<br></br>
                    暫時畫不出你想找的頁面
                  </p>
                  <Link
                    to="/products"
                    className="btn btn-light mt-4 px-5 hover-float"
                  >
                    去逛逛其他傑作
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="3000"
            className="w-md-50 w-100 position-absolute opacity-1 bg-404"
            style={{
              zIndex: "-1",
              minHeight: "100vh",
              right: "0",
              backgroundPosition: "center center",
              backgroundSize: "contain",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
