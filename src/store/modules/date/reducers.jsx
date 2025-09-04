import * as types from "./type";
// 重要日期信息
const initialState = {
  loveBefore: {},
  data: [],
};
const dateReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_DATA:
      return { ...action.payload };
    case types.UPDATE_DATA:
      let id = action.payload.id;
      let index = state.data.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.data[index] = action.payload;
      } else {
        state.data.push(action.payload);
      }
      return { ...state, data: action.payload };
    case types.DELETE_DATA:
      let id2 = action.payload.id;
      let index2 = state.data.findIndex((item) => item.id === id2);
      if (index2 !== -1) {
        state.data.splice(index2, 1);
      }
      return { ...state, data: action.payload };
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
