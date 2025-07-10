import { Link ,useOutletContext ,Outlet} from "react-router-dom";
import useCoupon from "./hook/useCoupon";

function CouponList(){
  const { cpPage, setCpPage,message, setMessage} = useOutletContext()
  const {couponsData,deleteCoupon,pageInfo,fetchCoupon} =useCoupon({ message, setMessage})
  
  
    return( 
      
    <div className="p-3">
      <Outlet context={{cpPage, setCpPage,fetchCoupon,message, setMessage}}/>
            <h3>優惠卷列表</h3>
            <hr />
            <div className="text-end">
            <Link to="couponmodal" className="btn btn-primary btn-sm">   
                建立新優惠卷
              </Link>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">標題</th>
                  <th scope="col">折扣（%）</th>
                  <th scope="col">到期日</th>
                  <th scope="col">優惠碼</th>
                  <th scope="col">啟用狀態</th>
                </tr>
              </thead>
              <tbody>
              {couponsData.map((coupon)=>{
                return <tr key={coupon.id}>
                  <td>{coupon.title}</td>
                  <td>{coupon.percent}</td>
                  <td>{coupon.due_date}</td>
                  <td>{coupon.code}</td>
                  <td>{coupon.is_enabled?"啟動":"未啟動"}</td>
                  
                  <td>
                    <Link
                      type="button"
                      className="btn btn-primary btn-sm"
                      to={`couponmodal/${coupon.id}`} state={{coupon}}
                      
                    >
                      編輯
                    </Link>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={()=>{deleteCoupon(coupon.id)}}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              
              
              })}
              </tbody>
            </table>
            
       <div/>
       <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className={`page-item ${cpPage === 1 ? "disabled" : ""}`}>
                <Link
                  to={`?page=${cpPage - 1}`}
                  className="page-link"
                  href="/"
                  aria-label="Previous"
                  onClick={() => fetchCoupon(cpPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                </Link>
              </li>

              {[...Array(pageInfo.total_pages)].map((_, i) => (
                <li className="page-item" key={`${i}_page`}>
                  <Link
                    to={`?page=${i + 1}`}
                    className={`page-link ${cpPage === i + 1 ? "active" : ""}`}
                    href="/"
                    onClick={() => {
                      fetchCoupon(i + 1);
                    }}
                  >
                    {i + 1}
                  </Link>
                </li>
              ))}
              <li
                className={`page-item ${
                  cpPage === pageInfo.total_pages ? "disabled" : ""
                }`}
              >
                <Link
                  to={`?page=${cpPage + 1}`}
                  className="page-link"
                  href="/"
                  aria-label="Next"
                  onClick={() => fetchCoupon(cpPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                </Link>
              </li>
            </ul>
          </nav>
   
       </div>
       
    )
}

export default CouponList;