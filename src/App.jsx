import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import Routers from "./router";
import { getIsLogin } from "./store/modules/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { defUser, defAlbum, defData } from "./constants/Initialization.jsx";
function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);
  // 初始化用户信息
  useEffect(() => {
    if (!isLogin) {
      // 初始化用户基本信息
      dispatch({
        type: "SET_USER",
        payload: defUser,
      });
      // 初始化用户重要日期信息
      dispatch({
        type: "SET_DATA",
        payload: defData,
      });
      // 初始化相册信息
      dispatch({
        type: "SET_ALBUM",
        payload: defAlbum,
      });
    }
  }, [dispatch, isLogin]);

  return <Routers />;
}

export default App;
