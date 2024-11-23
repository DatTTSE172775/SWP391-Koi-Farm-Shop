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
export const FETCH_ORDERS_BY_CUSTOMER_REQUEST = "FETCH_ORDERS_BY_CUSTOMER_REQUEST";
export const FETCH_ORDERS_BY_CUSTOMER_SUCCESS = "FETCH_ORDERS_BY_CUSTOMER_SUCCESS";
export const FETCH_ORDERS_BY_CUSTOMER_FAILURE = "FETCH_ORDERS_BY_CUSTOMER_FAILURE";
export const FETCH_ORDER_DETAIL_REQUEST = "FETCH_ORDER_DETAIL_REQUEST";
export const FETCH_ORDER_DETAIL_SUCCESS = "FETCH_ORDER_DETAIL_SUCCESS";
export const FETCH_ORDER_DETAIL_FAILURE = "FETCH_ORDER_DETAIL_FAILURE";
export const CANCEL_ORDER_REQUEST = "CANCEL_ORDER_REQUEST";
export const CANCEL_ORDER_SUCCESS = "CANCEL_ORDER_SUCCESS";
export const CANCEL_ORDER_FAILURE = "CANCEL_ORDER_FAILURE";

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

const fetchOrdersByCustomerRequest = () => ({
  type: FETCH_ORDERS_BY_CUSTOMER_REQUEST,
});

const fetchOrdersByCustomerSuccess = (orders) => ({
  type: FETCH_ORDERS_BY_CUSTOMER_SUCCESS,
  payload: orders,
});

const fetchOrdersByCustomerFailure = (error) => ({
  type: FETCH_ORDERS_BY_CUSTOMER_FAILURE,
  payload: error,
});

const fetchOrderDetailRequest = () => ({ type: FETCH_ORDER_DETAIL_REQUEST });
const fetchOrderDetailSuccess = (order) => ({
  type: FETCH_ORDER_DETAIL_SUCCESS,
  payload: order,
});
const fetchOrderDetailFailure = (error) => ({
  type: FETCH_ORDER_DETAIL_FAILURE,
  payload: error,
});


// Thunk Action to Fetch Customer ID and Create an Order
export const createOrder = (orderData) => async (dispatch) => {
  dispatch(createOrderRequest());
  try {
    const username = localStorage.getItem("username");
    if (!username) throw new Error("Username not found in localStorage");

    // Fetch customer ID from backend
    const customerResponse = await axiosInstance.get(`/customers/username/${username}`);
    const customerID = customerResponse.data.CustomerID;

    const payload = {
      ...orderData,
      customerID, // Attach the fetched customer ID
    };

    console.log("Order payload:", payload);

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
    const response = await axiosInstance.get("orders/all");
    dispatch(fetchOrdersSuccess(response.data));
  } catch (error) {
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

    await axiosInstance.patch(`/orders/${orderId}/processing`);

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
    dispatch(fetchOrders());
  } catch (error) {
    dispatch(assignOrderFailure(error.message || "Giao đơn hàng thất bại"));

    notification.error({
      message: "Lỗi",
      description: "Không thể giao đơn hàng. Vui lòng thử lại.",
    });
  }
};

export const fetchOrdersByUser = (userId) => async (dispatch) => {
  dispatch(fetchOrdersByUserRequest()); // Sử dụng biến đã khai báo

  try {
    const response = await axiosInstance.get(`/orders/user/${userId}`);
    console.log("API Response:", response.data); // Log để kiểm tra dữ liệu

    dispatch(fetchOrdersByUserSuccess(response.data)); // Sử dụng biến đã khai báo
  } catch (error) {
    dispatch(fetchOrdersByUserFailure(error.message)); // Sử dụng biến đã khai báo
    notification.error({
      message: "Lỗi",
      description: "Hiện tại không có đơn hàng nào.",
    });
  }
};

// Thunk Action to Fetch Orders by Customer ID
export const fetchOrdersByCustomer = (customerId) => async (dispatch) => {
  dispatch(fetchOrdersByCustomerRequest());
  try {
    const response = await axiosInstance.get(`/orders/customer/${customerId}`);
    console.log("Orders fetched successfully:", response.data); // Debugging
    dispatch(fetchOrdersByCustomerSuccess(response.data));
  } catch (error) {
    console.error("Failed to fetch orders:", error.message); // Debugging
    dispatch(fetchOrdersByCustomerFailure(error.message || "Failed to fetch orders"));
  }
};

// Thunk Action to Fetch Order Detail
export const fetchOrderDetail = (OrderId) => async (dispatch) => {
  dispatch({ type: "FETCH_ORDER_DETAIL_REQUEST" });
  try {
    const response = await axiosInstance.get(`orders/${OrderId}`); // Đảm bảo endpoint chính xác
    console.log("API Response:", response.data); // Debug dữ liệu trả về
    dispatch({
      type: "FETCH_ORDER_DETAIL_SUCCESS",
      payload: response.data, // Đảm bảo payload đúng định dạng
    });
  } catch (error) {
    console.error("Error fetching order details:", error.message);
    dispatch({
      type: "FETCH_ORDER_DETAIL_FAILURE",
      payload: error.message || "Lỗi khi lấy thông tin đơn hàng",
    });
  }
};

export const cancelOrder = (OrderID) => async (dispatch) => {
  dispatch({ type: CANCEL_ORDER_REQUEST });
  try {
    await axiosInstance.patch(`orders/${OrderID}/cancelled`);
    dispatch({ type: CANCEL_ORDER_SUCCESS, payload: OrderID });

    notification.success({
      message: "Thành công",
      description: "Đơn hàng đã được hủy.",
    });
  } catch (error) {
    dispatch({ type: CANCEL_ORDER_FAILURE, payload: error.message });

    notification.error({
      message: "Lỗi",
      description: error.message || "Không thể hủy đơn hàng.",
    });
  }
};


