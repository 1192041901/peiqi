import { useEffect } from "react";
import "./App.scss";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import supabase from "./utils/supabase";
import routes from "./router/routes";
import Loading from "./router/loading/loading";
import { useState } from "react";
function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const handleClick = async (userId) => {
    // 根据用户 ID 获取 profiles 表中的信息
    const { data, error, status } = await supabase
      .from("profiles")
      .select("*") // 选择需要的字段
      .eq("id", userId) // 根据 ID 匹配用户
      .single(); // 只期望返回一条记录
    if (error && status !== 406) {
      // 406 错误表示未找到记录，可能是新用户还没有 profile
      console.error("获取用户配置信息出错:", error.message);
      return null;
    }

    if (data) {
      console.log("用户配置信息:", data);
      return data;
    }
    return null;
  };

  // 获取用户信息
  const handleGetUserInfo = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
      navigate("/login");
    } else if (data) {
      // 存储基本用户信息
      dispatch({
        type: "SET_USER_INFO",
        payload: data,
      });
      // 存储业务用户信息
      const userInfo = await handleClick(data.user.id);
      dispatch({
        type: "SET_USER_INFO_INFO",
        payload: userInfo,
      });
    }
    setIsLoading(false);
    return data;
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
