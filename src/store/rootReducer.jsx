import { combineReducers } from "redux";
import userReducer from "./modules/user/reducers.jsx";
const rootReducer = combineReducers({
  user: userReducer,
});

export default rootReducer;
