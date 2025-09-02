import { useSelector, useDispatch } from "react-redux";
import { getUserInfo } from "../store/modules/user/selectors";

const UserTest = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(getUserInfo);

  const handleSetUser = () => {
    dispatch({
      type: "SET_USER",
      payload: {
        id: 1,
        name: "测试用户",
        email: "test@example.com",
        timestamp: new Date().toISOString(),
      },
    });
  };

  const handleClearUser = () => {
    dispatch({
      type: "DELETE_USER",
      payload: null,
    });
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h3>Redux Persist 测试</h3>
      <p>当前用户信息: {userInfo ? JSON.stringify(userInfo, null, 2) : "无"}</p>
      <button onClick={handleSetUser} style={{ marginRight: "10px" }}>
        设置用户信息
      </button>
      <button onClick={handleClearUser}>清除用户信息</button>
      <p style={{ fontSize: "12px", color: "#666", marginTop: "10px" }}>
        设置用户信息后刷新页面，数据应该会保持
      </p>
    </div>
  );
};

export default UserTest;
