import * as types from "./type";
// 相册信息
const initialState = {
  album: [],
};
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ALBUM:
      // 初始化相册信息
      return { ...state, album: action.payload };
    case types.UPDATE_ALBUM:
      // 更新相册信息
      let id = action.payload.id;
      let index = state.album.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.album[index] = action.payload;
      } else {
        state.album.push(action.payload);
      }
      return { ...state, album: state.album };
    case types.DELETE_ALBUM:
      // 删除相册信息
      let id2 = action.payload.id;
      let index2 = state.album.findIndex((item) => item.id === id2);
      if (index !== -1) {
        state.album.splice(index2, 1);
      }
      return { ...state, album: state.album };
    case types.GET_ALBUM:
      // 获取相册信息
      return { ...state, album: action.payload };
    default:
      return state;
  }
};
export default albumReducer;
