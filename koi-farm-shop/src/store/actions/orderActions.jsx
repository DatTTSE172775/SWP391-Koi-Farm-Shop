import axiosInstance from "../../api/axiosInstance";

// Action Types
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";

// Action Creators
const createOrderRequest = () => ({ type: CREATE_ORDER_REQUEST });

const createOrderSuccess = (order) => ({
  type: CREATE_ORDER_SUCCESS,
  payload: order,
});

const createOrderFailure = (error) => ({
  type: CREATE_ORDER_FAILURE,
  payload: error,
});

const fetchOrdersRequest = () => ({ type: FETCH_ORDERS_REQUEST });

const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,
  payload: orders,
});

const fetchOrdersFailure = (error) => ({
  type: FETCH_ORDERS_FAILURE,
  payload: error,
});

// Thunk Action to Fetch Customer ID and Create an Order
export const createOrder = (orderData) => async (dispatch) => {
  dispatch(createOrderRequest());

  try {
    const username = localStorage.getItem("username");
    if (!username) throw new Error("Username not found in localStorage");

    // Fetch customer details using username
    const customerResponse = await axiosInstance.get(
      `customers/username/${username}`
    );
    const customerID = customerResponse.data.CustomerID;

    console.log("Customer ID:", customerID);

    // Prepare order data
    const payload = {
      customerID,
      totalAmount: orderData.totalAmount,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
    };

    console.log("Order payload:", payload);

    // Send POST request to create an order
    const response = await axiosInstance.post("/orders", payload);
    console.log("Order created successfully:", response.data);

    dispatch(createOrderSuccess(response.data));
  } catch (error) {
    console.error("Order creation failed:", error);
    dispatch(createOrderFailure(error.message || "Failed to create order"));
  }
};

// Thunk Action to Fetch All Orders
export const fetchOrders = () => async (dispatch) => {
  dispatch(fetchOrdersRequest());

  try {
    const response = await axiosInstance.get("/orders");
    console.log("Orders fetched successfully:", response.data);

    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    dispatch(fetchOrdersFailure(error.message || "Failed to fetch orders"));
  }
};
