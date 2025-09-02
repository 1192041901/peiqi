import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Routers from "./router";
import { getIsLogin } from "./store/modules/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { defUser } from "./utils/defUser.jsx";
function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);

  // 初始化用户信息
  useEffect(() => {
    if (isLogin) {
      dispatch({
        type: "SET_USER",
        payload: defUser,
      });
    }
  }, [dispatch, isLogin]);

  return <Routers />;
}

export default App;
