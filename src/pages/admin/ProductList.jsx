import { Link, useOutletContext, Outlet, useLocation } from "react-router-dom";
import useProduct from "./hook/useProduct";

function ProductList() {
  const { dbPage, setDbPage, message, setMessage } = useOutletContext();

  const { fetchProducts, pageInfo, productsData, deleteProduct } = useProduct({
    message,
    setMessage,
  });

  return (
    <div className="p-3">
      <Outlet context={{ dbPage, setDbPage, message, setMessage }} />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <Link to="productmodal" className="btn btn-primary btn-sm">
          建立新商品
        </Link>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        {productsData.map((product) => {
          return (
            <tbody key={product.id}>
              <tr>
                <td>{product.category}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.is_enabled ? "啟動" : "未啟動"}</td>

                <td>
                  <Link
                    type="button"
                    className="btn btn-primary btn-sm"
                    to={`productmodal/${product.id}`}
                    state={{ product }}
                  >
                    編輯
                  </Link>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => {
                      deleteProduct(product.id);
                    }}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>

      <div />
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${dbPage === 1 ? "disabled" : ""}`}>
            <Link
              to={`?page=${dbPage - 1}`}
              className="page-link"
              href="/"
              aria-label="Previous"
              onClick={() => fetchProducts(dbPage - 1)}
            >
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>

          {[...Array(pageInfo.total_pages)].map((_, i) => (
            <li className="page-item" key={`${i}_page`}>
              <Link
                to={`?page=${i + 1}`}
                className={`page-link ${dbPage === i + 1 ? "active" : ""}`}
                href="/"
                onClick={() => {
                  fetchProducts(i + 1);
                }}
              >
                {i + 1}
              </Link>
            </li>
          ))}
          <li
            className={`page-item ${
              dbPage === pageInfo.total_pages ? "disabled" : ""
            }`}
          >
            <Link
              to={`?page=${dbPage + 1}`}
              className="page-link"
              href="/"
              aria-label="Next"
              onClick={() => fetchProducts(dbPage + 1)}
            >
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
 
    </div>
  );
}

export default ProductList;
