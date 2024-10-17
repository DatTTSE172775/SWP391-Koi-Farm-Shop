import { combineReducers } from "redux";
import authReducer from "./reducers/authReducers";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
