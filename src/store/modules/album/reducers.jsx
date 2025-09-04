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
        // 更新现有相册
        const newAlbum = [...state.album];
        newAlbum[index] = action.payload;
        return { ...state, album: newAlbum };
      } else {
        // 添加新相册
        return { ...state, album: [...state.album, action.payload] };
      }
    case types.DELETE_ALBUM:
      // 删除相册信息
      let id2 = action.payload.id;
      let index2 = state.album.findIndex((item) => item.id === id2);
      if (index2 !== -1) {
        // 创建新数组，删除指定项
        const newAlbum = state.album.filter((item) => item.id !== id2);
        return { ...state, album: newAlbum };
      }
      return state;
    case types.GET_ALBUM:
      // 获取相册信息
      return { ...state, album: action.payload };
    default:
      return state;
  }
};
export default albumReducer;
