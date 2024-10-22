import {
  ASSIGN_ORDER_FAILURE,
  ASSIGN_ORDER_REQUEST,
  ASSIGN_ORDER_SUCCESS,
  CREATE_ORDER_FAILURE,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  FETCH_ORDERS_FAILURE,
  FETCH_ORDERS_REQUEST,
  FETCH_ORDERS_SUCCESS,
} from "../actions/orderActions";

const initialState = {
  orders: [],
  order: null,
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, order: action.payload };

    case CREATE_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case FETCH_ORDERS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: action.payload };

    case FETCH_ORDERS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ASSIGN_ORDER_REQUEST:
      return { ...state, loading: true, error: null };

    case ASSIGN_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: state.orders.map((order) =>
          order.OrderID === action.payload.OrderID
            ? { ...order, assignedTo: action.payload.UserID }
            : order
        ),
      };

    case ASSIGN_ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case "FETCH_ORDERS_BY_USER_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ORDERS_BY_USER_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "FETCH_ORDERS_BY_USER_FAILURE":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default orderReducer;
