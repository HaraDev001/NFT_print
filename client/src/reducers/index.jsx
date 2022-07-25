import { combineReducers } from "redux";
import walletReducer from "./walletReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  wallet: walletReducer,
  auth: authReducer,
  error: errorReducer
});
