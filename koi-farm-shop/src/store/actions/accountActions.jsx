import axiosInstance from "../../api/axiosInstance";

// Action types
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

// Action creators
export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  payload: error,
});

// Thunk action to fetch user by username
export const fetchUserByUsername = (username) => async (dispatch) => {
  console.log("Fetching user for username:", username); // Debug log

  try {
    const response = await axiosInstance.get(`customers/username/${username}`);
    console.log("API Response:", response.data); // Debug log
    dispatch(fetchUserSuccess(response.data));
  } catch (error) {
    console.error("API Error:", error); // Debug log
    dispatch(fetchUserFailure(error.message));
  }
};
