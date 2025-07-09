import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Message from "../../components/Message";
import {
  useParams,
  NavLink,
  Link,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import Swiper from "swiper";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import "../../stylesheets/all.scss";

function ProductDetail() {
  const [productsData, setProductsData] = useState({});
  const [allProductsData, setAllProductsData] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const swiperRef = useRef(null);
  Swiper.use([Autoplay, Navigation]);
  const { getCart , message, setMessage } = useOutletContext();
  const navigation = useNavigate();

  //加入購物車
  const addToCart = async () => {
    const data = {
      data: {
        product_id: id,
        qty: cartQuantity,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/cart`,
        data
      );
      console.log("res", res);
      setIsLoading(false);
      const msg = res.data; // 傳入新增購物車商品成功訊息
      setMessage((prev) =>
        prev.success === msg.success && prev.message === msg.message
          ? prev
          : { success: msg.success, message: msg.message }
      );
      getCart();
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  //當前頁的產品
  const fetchProducts = async (id) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/product/${id}`
    );

    const product = res?.data?.product ?? {};

    setProductsData(product);
    console.log("productsData", productsData);
  };

  useEffect(() => {
    fetchProducts(id);
  }, [id]);

  //下排所有推薦商品
  const fetchAllProducts = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/products/all`
    );

    const allProduct = res?.data?.products ?? {};

    setAllProductsData(allProduct);
    console.log("allProduct", allProduct);
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  //下排商品平移動畫
  useEffect(() => {
    const mySwiper = new Swiper(swiperRef.current, {
      modules: [Autoplay, Navigation],
      loop: false,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      breakpoints: {
        767: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    return () => mySwiper.destroy();
  }, []);

  //存id，讓畫面刷新後，還能導到detail頁面
  useEffect(() => {
    localStorage.setItem("lastProductId", id);
  }, [id]);

  //點擊下排商品後，緩慢移動到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  return (
    <>
      <Message message={message} setMessage={setMessage} />
      <div className="mt-5 mx-5 pt-5">
        <div className="row align-items-center">
          <div className="col-md-7">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active ">
                  <img
                    src={productsData.imageUrl || productsData.imagesUrl}
                    className="d-block  object-cover shadow rounded img-media"
                    alt="產品圖片"
                    // style={{ height: 500 }}
                    data-bs-toggle="modal"
                    data-bs-target="#photoModal"
                  />
                </div>
                <div
                  className="modal fade"
                  id="photoModal"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content bg-transparent border-0 position-relative">
                      <button
                        type="button"
                        className="btn-close position-absolute end-0 me-3 mt-3"
                        data-bs-dismiss="modal"
                      ></button>

                      <img
                        src={productsData.imageUrl || productsData.imagesUrl}
                        className="w-100 rounded"
                        alt="放大產品圖片"
                      />
                    </div>
                  </div>
                </div>
                {productsData.imagesUrl?.map((img, i) => {
                  return (
                    <div className="carousel-item" key={i}>
                      <img
                        src={img}
                        className="d-block  object-cover img-media"
                        alt="產品圖片"
                        // style={{ height: 500, width: 500 }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-5" data-aos="fade-up">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                <NavLink className="breadcrumb-item text-muted" to="/">
                  Home
                </NavLink>
                <NavLink className="breadcrumb-item text-muted" to="/products">
                  Product
                </NavLink>
                <li className="breadcrumb-item active" aria-current="page">
                  Detail
                </li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{productsData.title}</h2>
            <p className="mb-0 text-muted text-end">
              <del>{`NT$${productsData.origin_price}`}</del>
            </p>
            <p className="h4 fw-bold text-end">{`NT$${productsData.price}`}</p>
            <div className="row align-items-center">
              <div className="col-6">
                <div className="input-group my-3 bg-light rounded">
                  <div className="input-group-prepend">
                    <button
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      id="button-addon1"
                      onClick={() =>
                        setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                      }
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                  </div>
                  <p className="form-control border-0 text-center my-auto shadow-none bg-light">
                    {cartQuantity}
                  </p>
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-dark border-0 py-2"
                      type="button"
                      id="button-addon2"
                      onClick={() => setCartQuantity((pre) => pre + 1)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  className="text-nowrap btn btn-dark w-100 py-2"
                  disabled={isLoading}
                  onClick={() => addToCart()}
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-5">
          <div className="col-md-4">
            <p>{productsData.description}</p>
          </div>
          <div className="col-md-3">
            <p className="text-muted">{productsData.content}</p>
          </div>
        </div>
        <h3 className="fw-bold">猜你喜歡</h3>
        <div
          className="swiper-container mt-4 mb-5 overflow-hidden "
          ref={swiperRef}
        >
          <div className="swiper-wrapper gap-4">
            {allProductsData
              .filter((p) => p.id !== id)
              .map((product) => {
                return (
                  <div
                    className="swiper-slide "
                    key={product.id}
                    style={{ maxWidth: 400 }}
                  >
                    <div className="card border-0 mb-4 position-relative hover-float">
                      <img
                        src={product.imageUrl || product.imagesUrl?.[0]}
                        className="card-img-top rounded-0 object-cover mb-3"
                        alt="產品圖片"
                        style={{ height: 350 }}
                        onClick={() => {
                          navigation(`/products/${product.id}`);
                          localStorage.setItem("lastProductId", product.id);
                        }}
                      />
                      <a href="#" className="text-dark"></a>
                      <div className="card-body p-0">
                        <Link
                          className="mb-2 mt-5"
                          to={`/products/${product.id}`}
                          onClick={() => {
                            localStorage.setItem("lastProductId", product.id);
                          }}
                        >
                          <h4>{product.title}</h4>
                        </Link>
                        <p className="card-text mb-2 mt-2">
                          {`NT$${product.price}`}{" "}
                          <span className="text-muted ">
                            <del>{`NT$${product.origin_price}`}</del>
                          </span>
                        </p>
                        <p className="text-muted mt-3"></p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
