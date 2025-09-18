import * as types from "./type";

// 用户基本信息
const initialState = {
  userInfo: null, //用户信息(来自supabase)
  info: null, //用户信息(来自业务)
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case types.UPDATE_USER_INFO:
      return { ...state, userInfo: action.payload };
    case types.DELETE_USER_INFO:
      return { ...state, userInfo: null };
    case types.GET_USER_INFO:
      return { ...state, userInfo: action.payload };
    case types.SET_USER_INFO_INFO:
      return { ...state, info: action.payload };
    case types.UPDATE_USER_INFO_INFO:
      return { ...state, info: action.payload };
    case types.DELETE_USER_INFO_INFO:
      return { ...state, info: null };
    case types.GET_USER_INFO_INFO:
      return { ...state, info: action.payload };
    default:
      return state;
  }
};
export default userReducer;
