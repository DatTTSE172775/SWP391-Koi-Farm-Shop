import axiosInstance from "../../api/axiosInstance";

// action types
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

//action creators
export const fetchOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDERS_REQUEST });

  try {
    const response = await axiosInstance.get("/orders");
    dispatch({ type: FETCH_ORDERS_SUCCESS, payload: response.data.orders });
  } catch (error) {
    dispatch({
      type: FETCH_ORDERS_FAILURE,
      payload: error.response?.data?.message || "Failed to fetch orders",
    });
  }
};
