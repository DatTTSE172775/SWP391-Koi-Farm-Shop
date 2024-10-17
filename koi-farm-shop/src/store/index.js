import { combineReducers } from "redux";
import authReducer from "./reducers/authReducers";
import orderReducer from "./reducers/orderReducers";

const rootReducer = combineReducers({
  orders: orderReducer,
  auth: authReducer,
});

export default rootReducer;
