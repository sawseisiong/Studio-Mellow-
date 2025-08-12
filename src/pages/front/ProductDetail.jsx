import { useEffect, useState, useRef } from "react";
import axios from "axios";
import IsLoading from "../../components/IsLoading";
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

function ProductDetail() {
  const [productsData, setProductData] = useState({}); //產品資料
  const [allProductsData, setAllProductsData] = useState([]); //底下產品輪播圖 資料列
  const [cartQuantity, setCartQuantity] = useState(1); //加入購物車數量
  const [cartLoading, setCartLoading] = useState(false);//加入購物車 Loading
  const [isLoading, setIsLoading] = useState(false); //載入 API Loading
  const [addMessage, setAddedMessage] = useState(false);//出現加入購物車字樣
  const { id } = useParams(); //從產品頁傳入的產品 id
  const swiperRef = useRef(null);
  Swiper.use([Autoplay, Navigation]);
  const { getCart } = useOutletContext(); //傳入 更新購物車函式｜訊息通知
  const navigation = useNavigate();

  //加入購物車
  const addToCart = async () => {
    const data = {
      data: {
        product_id: id, //產品 id
        qty: cartQuantity, //數量
      },
    };
    setCartLoading(true); //設置 Loading 時間
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/v2/api/${
          import.meta.env.VITE_API_PATH
        }/cart`,
        data
      );
      setCartLoading(false); //解除 Loading 時間
     
      
      getCart(); //更新購物車資料
    } catch{

      setCartLoading(false); //恢復 Loading 初始設置
    }
  };

  //取出當前頁的產品｜資訊｜圖片
  const fetchProducts = async (id) => {
    setIsLoading(true)
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/v2/api/${
        import.meta.env.VITE_API_PATH
      }/product/${id}`
    );
    setIsLoading(false)
    const product = res?.data?.product ?? {};
    setProductData(product);
  };

  //網頁 id 改變，觸發render
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

  //存id，讓畫面刷新後，依然能保留 detail 頁商品資訊
  useEffect(() => {
    localStorage.setItem("lastProductId", id);
  }, [id]);

  //點擊下排商品後，緩慢回到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(()=>{
    if (!addMessage) return
    const timer=  setTimeout(()=>setAddedMessage(false),1300)
    return()=>clearTimeout(timer)
  },[addMessage])

  return (
    <>
      {/* <Message message={message} setMessage={setMessage} /> */}
      {isLoading && <IsLoading/>}
      <div className="mt-5 mx-5 pt-5 ">
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
              <del>{`NT$${productsData?.origin_price?.toLocaleString()}`}</del>
            </p>
            <p className="h4 fw-bold text-end">{`NT$${productsData?.price?.toLocaleString()}`}</p>
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
                {addMessage && (
                  <p
                    className="position-absolute text-success px-2"
                    data-aos="fade-up"
                    data-aos-duration="900"
                    style={{ top: "320px" , backgroundColor:"white",borderRadius:"12px" }}
                  >
                    已加入購物車
                  </p>
                )}
                <button
                  type="button"
                  className="text-nowrap btn btn-dark w-100 py-2 position-relative"
                  disabled={cartLoading}
                  onClick={() => {
                    addToCart();
                    setAddedMessage(true);
                  }}
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
              .filter((p) => p.id !== id) //排除當前頁的產品出現在下排輪播
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
                        className="card-img-top rounded-0 object-cover mb-3 "
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
