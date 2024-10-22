import { combineReducers } from "redux";
import accountReducer from "./reducers/accountReducers";
import authReducer from "./reducers/authReducers";
import orderReducer from "./reducers/orderReducers";
import staffReducer from "./reducers/staffReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  order: orderReducer,
  staff: staffReducer,
});

export default rootReducer;
