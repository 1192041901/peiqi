import * as types from "./type";

// 用户基本信息
const initialState = {
  userInfo: null, //用户信息
  isLogin: false, //登录状态
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER:
      return { ...state, userInfo: action.payload, isLogin: true };
    case types.UPDATE_USER:
      return { ...state, userInfo: action.payload };
    case types.DELETE_USER:
      return { ...state, userInfo: null, isLogin: false };
    case types.GET_USER:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
};
export default userReducer;
