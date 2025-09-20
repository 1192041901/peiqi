import { useEffect } from "react";
import "./App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "./router/routes";
import { useState } from "react";
import { handleUserInfo } from "./store/modules/userInfo/action";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // 获取用户信息
  const handleGetUserInfo = async () => {
    const res = await dispatch(handleUserInfo());
    if (res.type === "error") {
      console.log(res.message);
      navigate("/login");
    }

    setIsLoading(false);
    return res;
  };

  useEffect(() => {
    handleGetUserInfo();
  }, []);

  return isLoading ? (
    <div></div>
  ) : (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
