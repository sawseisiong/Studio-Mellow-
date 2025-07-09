import {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const [loginError, setLoginError] = useState(true);
  const handleLogin = async () => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/v2/admin/signin`,
      formData
    );
    setLoginError(res.data.success);
    const { token } = res.data;
    if (res.data.success === true) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = token;
      console.log("token", token);
    }
    navigate("/dashboard");
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>登入帳號</h2>
            {!loginError && (
              <div className="alert alert-danger" role="alert">
                錯誤訊息
              </div>
            )}

            <div className="mb-2">
              <label htmlFor="email" className="form-label w-100">
                Email
                <input
                  id="email"
                  className="form-control"
                  onChange={handleChange}
                  name="username"
                  type="email"
                  placeholder="Email Address"
                />
              </label>
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="form-label w-100">
                密碼
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  name="password"
                  id="password"
                  placeholder="name@example.com"
                />
              </label>
            </div>
            <button
              type="button"
              onClick={handleLogin}
              className="btn btn-primary"
            >
              登入
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
