//处理用户信息相关操作
import * as types from "./type";
import supabase from "@/utils/supabase";
//处理用户信息相关操作
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
export const handleUserInfo = () => {
  return async (dispatch) => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
      return { type: "error", message: "用户未登录" };
    } else if (data) {
      // 存储基本用户信息（自己）
      dispatch({
        type: "SET_USER_INFO",
        payload: data,
      });
      // 存储业务用户信息（自己）
      const userInfo = await handleClick(data.user.id);
      dispatch({
        type: "SET_USER_INFO_INFO",
        payload: userInfo,
      });
      // 存在绑定关系
      if (userInfo.binding) {
        // 查询绑定的用户
        const { data: data1, error: error1 } = await supabase
          .from("user_bindings")
          .select("*")
          .or(`user_a_id.eq.${userInfo.id},user_b_id.eq.${userInfo.id}`)
          .eq("status", "accepted");
        if (data1) {
          console.log(data1, 22222);
          let linID;
          if (data1[0].user_a_id === userInfo.id) {
            linID = data1[0].user_b_id;
          } else {
            linID = data1[0].user_a_id;
          }
          // 查询绑定的用户
          const { data: data2, error: error2 } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", linID);
          if (data2) {
            dispatch({
              type: "SET_LOVER_INFO",
              payload: data2[0],
            });
          }
        }
      }
      return { type: "success", message: data, userInfo: userInfo };
    }
    return { type: "error", message: "用户信息获取失败" };
  };
};
