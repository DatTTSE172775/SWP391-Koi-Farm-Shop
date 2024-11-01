import axiosInstance from "../../api/axiosInstance";

// Action Types
export const FETCH_STAFF_REQUEST = "FETCH_STAFF_REQUEST";
export const FETCH_STAFF_SUCCESS = "FETCH_STAFF_SUCCESS";
export const FETCH_STAFF_FAILURE = "FETCH_STAFF_FAILURE";

// Action Creators
const fetchStaffRequest = () => ({
  type: FETCH_STAFF_REQUEST,
});

const fetchStaffSuccess = (staff) => ({
  type: FETCH_STAFF_SUCCESS,
  payload: staff,
});

const fetchStaffFailure = (error) => ({
  type: FETCH_STAFF_FAILURE,
  payload: error,
});

// Thunk Action to Fetch Staff Members
export const fetchStaff = () => async (dispatch) => {
  dispatch(fetchStaffRequest());

  try {
    const response = await axiosInstance.get("/staff");
    dispatch(fetchStaffSuccess(response.data));
  } catch (error) {
    dispatch(fetchStaffFailure(error.message || "Failed to fetch staff"));
  }
};
