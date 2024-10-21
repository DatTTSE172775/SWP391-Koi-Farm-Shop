import { combineReducers } from "redux";
import accountReducer from "./reducers/accountReducers";
import authReducer from "./reducers/authReducers";
import orderReducer from "./reducers/orderReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  order: orderReducer,
});

export default rootReducer;
