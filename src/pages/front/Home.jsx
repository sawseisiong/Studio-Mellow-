import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const imgs = ["/img/pp4.jpg", "/img/pp5.jpg", "/img/pp6.jpg"];

  const navigate = useNavigate();

  //水果列上的商品動畫
  useEffect(() => {
    let sections = gsap.utils.toArray(".imgSmall");//初始化：把所有 .imgSmall 元素抓成陣列

    //建立橫向捲動動畫
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",//線性移動，沒有加速或減速
      scrollTrigger: {
        trigger: ".containerImg",//元素捲到 containerImg 畫面時開始觸發
        start: "top center",//何時開始：當 trigger 的「頂端」碰到視窗「正中央」
        scrub: 1,//1 秒平滑緩衝
        snap: 1 / (sections.length - 1),

        end: () => "+=" + document.querySelector(".containerImg").offsetWidth,//動畫結束的位置 ｜+= 再往下捲一個容器寬，捲動就走完整段動畫
      },
    });
  }, []);


  

  //到首頁後，緩慢移動到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  return (
    <>
      <div className="position-relative ">
        <Fade
          duration={4000}//4秒 切換一次
          transitionDuration={1000}//切換速度 1秒
          easing="ease"
          arrows={false} //無箭頭
          pauseOnHover={false}
        >
          {imgs.map((img, i) => {
            return (
              <div
                className="container d-flex flex-column "
                key={i}
                style={{ minHeight: "100vh" }}//整個螢幕
              >
                <div
                  className="position-absolute d-flex justify-content-center align-items-center"
                  style={{
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    backgroundRepeat: "no-repeat",//圖片無重複
                    backgroundSize: "cover",//填滿
                    backgroundImage: `url(${import.meta.env.BASE_URL}${img})`,
                    backgroundPosition: "center center",//中央
                  }}
                >
                  <div className="row justify-content-center my-auto ">
                    <div className="col-md-4 text-center w-100 hover-float">
                      <img
                        src={`${import.meta.env.BASE_URL}/img/logo.png`}
                        alt="logo"
                        // style={{ height: "250px" }}
                        data-aos="fade-up"
                        data-aos-duration="3000"
                        className="logo-desktop"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Fade>

        <div className="  d-flex  justify-content-center align-items-center py-5 mt-5">
          <div className="col-md-6 text-center px-3" data-aos="fade-up">
            <h3>畫下溫柔，也畫進你家</h3>
            <h5 className="my-5 fs-6 ">
              Studio Mellow
              精選手繪插畫，印刷於高質感紙材，讓每一幅畫作都成為生活中的療癒角落。送禮、自用，都能感受到細膩與溫度。
            </h5>
            <p>
              <small>— 柔軟的線條，溫暖你的生活 —</small>
            </p>
          </div>
        </div>

        <div className="container" data-aos="fade-up">
          <div className="row mt-5">
            <Link
              className="col-md-4 mt-md-4"
              to="/products"
              state={{ page: 1, category: "電繪系列" }}
            >
              <div className="card border-0 mb-4">
                <div style={{ height: 300 }}>
                  <img
                    src={`${import.meta.env.BASE_URL}/img/digiDraw.jpg`}
                    className="card-img-top rounded-0 w-100 h-100 object-fit-cover shadow hover-float "
                    alt="電繪系列圖片"
                  />
                </div>
                <div className="card-body text-center">
                  <h4>電繪系列</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0 ">
                      用簡單的筆觸與溫潤的色彩，描繪你曾經感受過的日常時光。每一幅插畫，都是靜靜流動的情緒與記憶。
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link
              className="col-md-4 mt-md-4"
              to="/products"
              state={{ page: 1, category: "繪本系列" }}
            >
              <div className="card border-0 mb-4">
                <div style={{ height: 300 }}>
                  <img
                    src={`${import.meta.env.BASE_URL}/img/pictureBooks.jpg`}
                    className="card-img-top rounded-0 w-100 h-100 object-fit-cover shadow hover-float"
                    alt="繪本系列圖片"
                  />
                </div>
                <div className="card-body text-center">
                  <h4>繪本系列</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      有些畫不是用來看懂，而是用來感受。像翻開一本溫柔的繪本，這些畫說的，是屬於你自己的故事。
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link
              className="col-md-4 mt-md-4"
              to="/products"
              state={{ page: 1, category: "手繪系列" }}
            >
              <div className="card border-0 mb-4">
                <div style={{ height: 300}}>
                  <img
                    src={`${import.meta.env.BASE_URL}/img/handDrawn.jpg`}
                    className="card-img-top rounded-0 w-100 h-100 object-fit-cover shadow hover-float"
                    alt="手繪系列圖片"
                  />
                </div>
                <div className="card-body text-center">
                  <h4>手繪系列</h4>
                  <div className="d-flex justify-content-between">
                    <p className="card-text text-muted mb-0">
                      來自雙手的細節與力道，讓每一筆都多了一點溫度。這些線條，來自某個靜靜創作的午後，也將陪伴你每個靜好的日子。
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="bg-light mt-5 mb-5">
          <div className="container">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner  " data-aos="fade-up">
                <div
                  className="col-md-6 text-center containerImg"
                  style={{
                    display: "flex",
                    gap: 20,

                    height: 350,
                    paddingTop: 35,
                    paddingBottom: 35,
                    filter: "drop-shadow(5px 8px 2px rgba(0, 0, 0, 0.3))",
                  }}
                >
                  <img
                    className=" imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/lemon.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(150px)" ,height:250}} //設定高度，響應式不變形
                  />
                  <img
                    className="imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/orange.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(250px)" ,height:250}}
                  />
                  <img
                    className="imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/mango.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(350px)",height:250 }}
                  />
                  <img
                    className="imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/pomelo.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(450px)" ,height:250}}
                  />
                  <img
                    className="imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/roselle.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(550px)" ,height:250}}
                  />
                  <img
                    className="imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/tomato.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(650px)" ,height:250}}
                  />
                  <img
                    className="imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/strawberry.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(750px)" ,height:250}}
                  />
                  <img
                    className="imgSmall"
                    src={`${import.meta.env.BASE_URL}/img/love-fruit.png`}
                    alt="水果插畫"
                    style={{ transform: "translateX(850px)" ,height:250}}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="d-flex justify-content-center py-5"
          data-aos="fade-zoom-in"
          data-aos-easing="ease-in-back"
          data-aos-delay="300"
          data-aos-offset="0"
        >
          <Link
            type="button"
            to="/products"
            class="btn btn-primary btn-lg px-5 hover-float"
            style={{ color: "#F3F3F3" }}
          >
            收藏這份溫柔
          </Link>
        </div>
        <div className="container my-5 mt-5 ">
          <div className="row">
            <div className="col-md-6" data-aos="fade-up">
              <img
                src={`${import.meta.env.BASE_URL}/img/hight-paper.png`}
                alt="紙張質感圖"
                className="img-fluid"
                style={{ height: 400, width: 700, objectFit: "cover" }}
              />
            </div>
            <div className="col-md-4 m-auto text-center">
              <h4 className="mt-4">紙，是畫的起點，也是質感的延續。</h4>
              <p className="text-muted">
                我們選用溫潤厚實的美術紙，保留筆觸與色彩的細節，
                讓你收到的不只是插畫，更是一份值得收藏的質感作品。
              </p>
            </div>
          </div>
          <div className="row flex-row-reverse justify-content-between mt-4">
            <div className="col-md-6" data-aos="fade-up">
              <img
                src={`${import.meta.env.BASE_URL}/img/pakege.jpg`}
                alt="紙皮包裝圖"
                className="img-fluid"
                style={{ height: 400, width: 700, objectFit: "cover" }}
              />
            </div>
            <div className="col-md-4 m-auto text-center">
              <h4 className="mt-4 ">一份畫，一份心意，包裝不只是保護。</h4>
              <p className="text-muted">
                每一幅畫都經過手工包裝，選用自然質感素材，
                就像送給重要的人一份溫柔的禮物，安心又有儀式感。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
