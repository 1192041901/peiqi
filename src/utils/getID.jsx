// 创建一个全局变量来存储 store 引用
let storeRef = null;

// 设置 store 引用的函数
export const setStoreRef = (store) => {
  storeRef = store;
};

const getID = () => {
  if (!storeRef) {
    console.log("Store 引用未设置");
    return null;
  }

  const state = storeRef.getState();
  const userInfo = state.userInfo.userInfo;

  if (!userInfo || !userInfo.user) {
    console.log("用户未登录");
    return null;
  }

  return userInfo.user.id;
};
export default getID;
