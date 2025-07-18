import { useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import useFrontProducts from "./hook/useFrontProducts";
import IsLoading from "../../components/IsLoading";


function Products() {
  // 讀取路由狀態，若從首頁點分類進來會帶入分類與頁碼
  const location = useLocation();
  const { state } = location;
  const page = state?.page;
  const category = state?.category;

  const {
    productsData,
    setPdPage,
    pdPage,
    pdCtgPage,
    pageInfo,
    active,
    setActive,
    fetchCategory,
    fetchProducts,
    isLoading
  } = useFrontProducts(category, page || 1); // 傳入初始分類與頁碼，避免先載入全部商品

  const navigate = useNavigate();

  //點擊下排商品頁碼後，緩慢移動到頂部
  useEffect(() => {
    window.scrollTo({ top: 400, behavior: "smooth" });
  }, [fetchProducts]);

  //切換頁面時，緩慢移動到頂部
  useEffect(() => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  }, [location]);

  return (
    <>
    {isLoading &&<IsLoading />}
      <div
        className="position-relative d-flex align-items-center justify-content-center "
        style={{ minHeight: "450px" }}
      >
        <div
          className="position-absolute "
          style={{
            top: "0",
            bottom: "0",
            left: "0",
            right: "0",
            backgroundImage:` url('${import.meta.env.BASE_URL}img/bg-product.png')`,
            backgroundPosition: "center center",
            opacity: "0.4",
          }}
        ></div>

        <img
          src={`${import.meta.env.BASE_URL}img/logo-product.png`}
          data-aos="fade-up"
          className="position-absolute "
          alt="logo"
          style={{ height: 200 }}
        />
      </div>

      <div className="container mt-md-5 mt-3 mb-7">
        <div className="row ">
          <div className="col-md-4" data-aos="fade-right">
            <div
              className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3"
              id="accordionExample"
            >
              <div className="card border-0">
              <div className="d-flex justify-content-between align-items-center pe-1 mb-3" >
                    <button className="btn btn-primary hover-float" onClick={()=>{fetchCategory(pdCtgPage,"");setActive("")}}><h4 className="mb-0 text-white fs-6 " >全部商品</h4></button>
                  </div>
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingOne"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                >
                  
                  <div className="d-flex justify-content-between align-items-center pe-1">
                    <button className="btn"><h4 className="mb-0">質感居家</h4></button>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block  btn hover-float"
                          style={{
                            color:
                              active === "場景系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("場景系列");
                            fetchCategory(pdCtgPage, "場景系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"場景系列"}})
                          }}
                        >
                          {console.log("active", active)}
                          場景系列
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block btn hover-float"
                          style={{
                            color: active === "3D 系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("3D 系列");
                            fetchCategory(pdCtgPage, "3D 系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"3D 系列"}})
                          }}
                        >
                          3D 系列
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block  btn hover-float"
                          style={{
                            color:
                              active === "電繪系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("電繪系列");
                            fetchCategory(pdCtgPage, "電繪系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"電繪系列"}})
                          }}
                        >
                          電繪系列
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingTwo"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                  <button className="btn"><h4 className="mb-0">暖心好禮</h4></button>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block  btn hover-float"
                          style={{
                            color:
                              active === "明信片系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("明信片系列");
                            fetchCategory(pdCtgPage, "明信片系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"明信片系列"}})
                          }}
                        >
                          明信片系列
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block  btn hover-float"
                          style={{
                            color:
                              active === "手繪系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("手繪系列");
                            fetchCategory(pdCtgPage, "手繪系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"手繪系列"}})
                          }}
                        >
                          手繪系列
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block  btn hover-float"
                          style={{
                            color:
                              active === "水果系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("水果系列");
                            fetchCategory(pdCtgPage, "水果系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"水果系列"}})
                          }}
                        >
                          水果系列
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card border-0">
                <div
                  className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0"
                  id="headingThree"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                >
                  <div className="d-flex justify-content-between align-items-center pe-1">
                  <button  className="btn"><h4 className="mb-0">親子童趣</h4></button>
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="card-body py-0">
                    <ul className="list-unstyled">
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block  btn hover-float"
                          style={{
                            color:
                              active === "動物系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("動物系列");
                            fetchCategory(pdCtgPage, "動物系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"動物系列"}})
                          }}
                        >
                          動物系列
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="py-2 d-block btn hover-float"
                          style={{
                            color:
                              active === "繪本系列" ? "#e26d5a" : "#B8B8B8",
                          }}
                          onClick={(e) => {
                            setActive("繪本系列");
                            fetchCategory(pdCtgPage, "繪本系列");
                            navigate('.',{replace:true,state:{page:pdCtgPage,category:"繪本系列"}})
                          }}
                        >
                          繪本系列
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="row">
              {productsData.map((product) => {
                return (
                  <div
                    className="col-md-6 "
                    key={product.id}
                    data-aos="fade-up"
                  >
                    <Link
                      to={`/products/${product.id}`}
                      onClick={() => {
                        localStorage.setItem("lastProductId", product.id);
                      }}
                    >
                      <div className="card border-0 mb-4 position-relative position-relative hover-float">
                        <img
                          src={product.imageUrl || product.imagesUrl?.[0]}
                          className="card-img-top rounded-0 object-cover "
                          style={{ height: 400}}
                          alt="產品圖片"
                        />
                       
                          <i
                            className="far fa-heart position-absolute"
                            style={{ right: "16px", top: "16px" }}
                          ></i>
                       
                        <div className="card-body p-0">
                          <h4 className="mb-0 mt-3">{product.title}</h4>
                          <p className="card-text mb-0">
                            {`NT$${product.price.toLocaleString()}`}
                          </p>
                          <p className="text-muted mt-3"></p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className={`page-item ${pdPage === 1 ? "disabled" : ""}`}>
                  <Link
                    to={`?page=${pdPage - 1}`}//上一頁
                    className="page-link"
                    href="/"
                    aria-label="Previous"
                    onClick={() => {
                      if (active) {
                        fetchCategory(pdCtgPage - 1, active);
                      } else {
                        fetchProducts(pdPage - 1);
                      }
                    }}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>

                {[...Array(pageInfo)].map((_, i) => ( //總頁碼數
                  <li className="page-item" key={`${i}_page`}>
                    <Link
                      to={`?page=${i + 1}`}
                      className={`page-link ${
                        pdPage === i + 1 ? "active" : ""
                      }`}
                      href="/"
                      onClick={() => {
                        if (active) {
                          fetchCategory(i + 1);
                        } else {
                          fetchProducts(i + 1);
                        }
                      }}
                    >
                      {i + 1}
                      {console.log("i", i)}
                    </Link>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    pdPage === pageInfo.total_pages ? "disabled" : ""
                  }`}
                >
                  <Link 
                    to={`?page=${pdPage + 1}`} //下一頁
                    className="page-link"
                    href="/"
                    aria-label="Next"
                    onClick={() => {
                      if (active) {
                        fetchCategory(pdCtgPage + 1, active);
                      } else {
                        fetchProducts(pdPage + 1);
                      }
                    }}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
