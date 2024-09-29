import { applyMiddleware, compose, createStore } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "../store/index";

// Cấu hình Redux DevTools Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Tạo store với middleware thunk
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
