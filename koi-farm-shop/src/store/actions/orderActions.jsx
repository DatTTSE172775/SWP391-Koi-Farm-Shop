import { notification } from "antd";
import axiosInstance from "../../api/axiosInstance";

// Action Types
export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILURE = "CREATE_ORDER_FAILURE";
export const FETCH_ORDERS_REQUEST = "FETCH_ORDERS_REQUEST";
export const FETCH_ORDERS_SUCCESS = "FETCH_ORDERS_SUCCESS";
export const FETCH_ORDERS_FAILURE = "FETCH_ORDERS_FAILURE";
export const ASSIGN_ORDER_REQUEST = "ASSIGN_ORDER_REQUEST";
export const ASSIGN_ORDER_SUCCESS = "ASSIGN_ORDER_SUCCESS";
export const ASSIGN_ORDER_FAILURE = "ASSIGN_ORDER_FAILURE";
export const FETCH_ORDERS_BY_USER_REQUEST = "FETCH_ORDERS_BY_USER_REQUEST";
export const FETCH_ORDERS_BY_USER_SUCCESS = "FETCH_ORDERS_BY_USER_SUCCESS";
export const FETCH_ORDERS_BY_USER_FAILURE = "FETCH_ORDERS_BY_USER_FAILURE";

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

const assignOrderRequest = () => ({ type: ASSIGN_ORDER_REQUEST });

const assignOrderSuccess = (order) => ({
  type: ASSIGN_ORDER_SUCCESS,
  payload: order,
});

const assignOrderFailure = (error) => ({
  type: ASSIGN_ORDER_FAILURE,
  payload: error,
});

const fetchOrdersByUserRequest = () => ({
  type: FETCH_ORDERS_BY_USER_REQUEST,
});

const fetchOrdersByUserSuccess = (orders) => ({
  type: FETCH_ORDERS_BY_USER_SUCCESS,
  payload: orders,
});

const fetchOrdersByUserFailure = (error) => ({
  type: FETCH_ORDERS_BY_USER_FAILURE,
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
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    dispatch(fetchOrdersFailure(error.message || "Failed to fetch orders"));
  }
};

// Thunk to assign order to staff
export const assignOrder = (orderId, userId, username) => async (dispatch) => {
  dispatch(assignOrderRequest());
  try {
    const response = await axiosInstance.patch(`/orders/${orderId}/assign`, {
      userId,
    });

    dispatch(
      assignOrderSuccess({
        ...response.data.order,
        assignedTo: username,
      })
    );

    notification.success({
      message: "Thành Công",
      description: `Đơn hàng ${orderId} đã được giao cho ${username}`,
    });
  } catch (error) {
    dispatch(assignOrderFailure(error.message || "Giao đơn hàng thất bại"));

    notification.error({
      message: "Lỗi",
      description: "Không thể giao đơn hàng. Vui lòng thử lại.",
    });
  }
};

export const fetchOrdersByUser = (userId) => async (dispatch) => {
  dispatch(fetchOrdersByUserRequest());
  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    dispatch(fetchOrdersByUserSuccess(response.data));
    console.log("Orders fetched for user:", response.data);
  } catch (error) {
    console.error("Failed to fetch orders by user ID:", error);
    dispatch(
      fetchOrdersByUserFailure(error.message || "Error fetching orders")
    );

    notification.error({
      message: "Lỗi",
      description: "Không thể lấy danh sách đơn hàng cho nhân viên này.",
    });
  }
};
