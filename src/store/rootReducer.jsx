import { combineReducers } from "redux";
import userReducer from "./modules/user/reducers.jsx";
import dateReducer from "./modules/date/reducers.jsx";
import albumReducer from "./modules/album/reducers.jsx";
import userInfoReducer from "./modules/userInfo/reducers.jsx";
const rootReducer = combineReducers({
  user: userReducer,
  date: dateReducer,
  album: albumReducer,
  userInfo: userInfoReducer,
});

export default rootReducer;
