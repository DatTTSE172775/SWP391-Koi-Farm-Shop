import { notification } from "antd";
import axiosInstance from "../../api/axiosInstance";

// Action Types
export const CREATE_CONSIGNMENT_REQUEST = "CREATE_CONSIGNMENT_REQUEST";
export const CREATE_CONSIGNMENT_SUCCESS = "CREATE_CONSIGNMENT_SUCCESS";
export const CREATE_CONSIGNMENT_FAILURE = "CREATE_CONSIGNMENT_FAILURE";
export const FETCH_CONSIGNMENTS_REQUEST = "FETCH_CONSIGNMENTS_REQUEST";
export const FETCH_CONSIGNMENTS_SUCCESS = "FETCH_CONSIGNMENTS_SUCCESS";
export const FETCH_CONSIGNMENTS_FAILURE = "FETCH_CONSIGNMENTS_FAILURE";
export const ASSIGN_CONSIGNMENT_REQUEST = "ASSIGN_CONSIGNMENT_REQUEST";
export const ASSIGN_CONSIGNMENT_SUCCESS = "ASSIGN_CONSIGNMENT_SUCCESS";
export const ASSIGN_CONSIGNMENT_FAILURE = "ASSIGN_CONSIGNMENT_FAILURE";
export const FETCH_CONSIGNMENTS_BY_USER_REQUEST = "FETCH_CONSIGNMENTS_BY_USER_REQUEST";
export const FETCH_CONSIGNMENTS_BY_USER_SUCCESS = "FETCH_CONSIGNMENTS_BY_USER_SUCCESS";
export const FETCH_CONSIGNMENTS_BY_USER_FAILURE = "FETCH_CONSIGNMENTS_BY_USER_FAILURE";

// Action Creators
const createConsignmentRequest = () => ({ type: CREATE_CONSIGNMENT_REQUEST });
const createConsignmentSuccess = (consignment) => ({
  type: CREATE_CONSIGNMENT_SUCCESS,
  payload: consignment,
});
const createConsignmentFailure = (error) => ({
  type: CREATE_CONSIGNMENT_FAILURE,
  payload: error,
});

const fetchConsignmentsRequest = () => ({ type: FETCH_CONSIGNMENTS_REQUEST });
const fetchConsignmentsSuccess = (consignments) => ({
  type: FETCH_CONSIGNMENTS_SUCCESS,
  payload: consignments,
});
const fetchConsignmentsFailure = (error) => ({
  type: FETCH_CONSIGNMENTS_FAILURE,
  payload: error,
});

const assignConsignmentRequest = () => ({ type: ASSIGN_CONSIGNMENT_REQUEST });
const assignConsignmentSuccess = (consignment) => ({
  type: ASSIGN_CONSIGNMENT_SUCCESS,
  payload: consignment,
});
const assignConsignmentFailure = (error) => ({
  type: ASSIGN_CONSIGNMENT_FAILURE,
  payload: error,
});

const fetchConsignmentsByUserRequest = () => ({
  type: FETCH_CONSIGNMENTS_BY_USER_REQUEST,
});
const fetchConsignmentsByUserSuccess = (consignments) => ({
  type: FETCH_CONSIGNMENTS_BY_USER_SUCCESS,
  payload: consignments,
});
const fetchConsignmentsByUserFailure = (error) => ({
  type: FETCH_CONSIGNMENTS_BY_USER_FAILURE,
  payload: error,
});

// Thunk Action to Create a Consignment
export const createConsignment = (consignmentData) => async (dispatch) => {
  dispatch(createConsignmentRequest());
  try {
    const username = localStorage.getItem("username");
    if (!username) throw new Error("Username not found in localStorage");

    const customerResponse = await axiosInstance.get(
      `customers/username/${username}`
    );
    const customerID = customerResponse.data.CustomerID;

    console.log("Customer ID:", customerID);

    const payload = {
      customerID,
      ...consignmentData,
    };

    console.log("Consignment payload:", payload);

    const response = await axiosInstance.post("/createConsignment", payload);
    console.log("Consignment created successfully:", response.data);

    dispatch(createConsignmentSuccess(response.data));
    notification.success({
      message: "Thành công",
      description: "Đã tạo yêu cầu ký gửi thành công",
    });
  } catch (error) {
    console.error("Consignment creation failed:", error);
    dispatch(createConsignmentFailure(error.message || "Failed to create consignment"));
    notification.error({
      message: "Lỗi",
      description: "Không thể tạo yêu cầu ký gửi. Vui lòng thử lại.",
    });
  }
};

// Thunk Action to Fetch All Consignments
export const fetchConsignments = () => async (dispatch) => {
  dispatch(fetchConsignmentsRequest());
  try {
    const response = await axiosInstance.get("/koiconsignments");
    dispatch(fetchConsignmentsSuccess(response.data));
  } catch (error) {
    dispatch(fetchConsignmentsFailure(error.message || "Failed to fetch consignments"));
    notification.error({
      message: "Lỗi",
      description: "Không thể lấy danh sách yêu cầu ký gửi. Vui lòng thử lại.",
    });
  }
};

// Thunk to assign consignment to staff
export const assignConsignment = (consignmentId, userId, username) => async (dispatch) => {
  dispatch(assignConsignmentRequest());
  try {
    const response = await axiosInstance.patch(`/koiconsignments/${consignmentId}/assign`, {
      userId,
    });

    await axiosInstance.patch(`/koiconsignments/${consignmentId}/approve`);

    dispatch(
      assignConsignmentSuccess({
        ...response.data.consignment,
        assignedTo: username,
      })
    );

    notification.success({
      message: "Thành Công",
      description: `Yêu cầu ký gửi ${consignmentId} đã được giao cho ${username}`,
    });
    dispatch(fetchConsignments());
  } catch (error) {
    dispatch(assignConsignmentFailure(error.message || "Giao yêu cầu ký gửi thất bại"));

    notification.error({
      message: "Lỗi",
      description: "Không thể giao yêu cầu ký gửi. Vui lòng thử lại.",
    });
  }
};

export const fetchConsignmentsByUser = (userId) => async (dispatch) => {
  dispatch(fetchConsignmentsByUserRequest());

  try {
    const response = await axiosInstance.get(`/koiconsignments/user/${userId}`);
    console.log("API Response:", response.data);

    dispatch(fetchConsignmentsByUserSuccess(response.data));
  } catch (error) {
    dispatch(fetchConsignmentsByUserFailure(error.message));
    notification.error({
      message: "Lỗi",
      description: "Không thể lấy danh sách yêu cầu ký gửi cho nhân viên này.",
    });
  }
};
