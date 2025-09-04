import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
import rootReducer from "./rootReducer";

// 持久化配置
const persistConfig = {
  key: "root", // 存储的key
  storage, // 使用localStorage
  whitelist: ["user", "date", "album"], // 只持久化user模块
  // blacklist: [], // 不持久化的模块
};

// 创建持久化的reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// 创建persistor
export const persistor = persistStore(store);

export default store;
