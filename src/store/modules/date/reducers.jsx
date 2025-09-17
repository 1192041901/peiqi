import * as types from "./type";
// 重要日期信息
const initialState = {
  loveBefore: {},
  data: [],
};
const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    // 初始化赋值
    case types.SET_DATA:
      return { ...action.payload };
    // 新增
    case types.ADD_DATA:
      // 自动补充id
      action.payload["id"] = state.data[state.data.length - 1].id + 1;
      return { ...state, data: [...state.data, action.payload] };
    // 更新
    case types.UPDATE_DATA:
      let id = action.payload.id;
      let index = state.data.findIndex((item) => item.id === id);
      console.log(index, 666);
      if (index !== -1) {
        // 创建新的数组，不直接修改原数组
        const newData = [...state.data];
        newData[index] = action.payload;
        return { ...state, data: newData };
      } else {
        // 如果找不到，则添加新项
        return { ...state, data: [...state.data, action.payload] };
      }
    // 删除
    case types.DELETE_DATA:
      let id2 = action.payload.id;
      let index2 = state.data.findIndex((item) => item.id === id2);
      if (index2 !== -1) {
        // 创建新的数组，不直接修改原数组
        const newData = [...state.data];
        newData.splice(index2, 1);
        return { ...state, data: newData };
      }
      return state;
    // 获取
    case types.GET_DATA:
      return { ...state, data: action.payload };
    case types.SET_LOVE_BEFORE:
      return { ...state, loveBefore: action.payload };
    case types.UPDATE_LOVE_BEFORE:
      return { ...state, loveBefore: action.payload };
    case types.DELETE_LOVE_BEFORE:
      return { ...state, loveBefore: action.payload };
    case types.GET_LOVE_BEFORE:
      return { ...state, loveBefore: action.payload };
    default:
      return state;
  }
};
export default dateReducer;
