import axiosPublic from "../../api/axiosPublic";

// ACTION TYPES
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

// ACTIONS CREATOR
// Login action
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axiosPublic.post("/login", {
      username,
      password,
    });

    if (response.status === 200 && response.data.token) {
      const { token, username } = response.data;

      dispatch({ type: LOGIN_SUCCESS, payload: { username, token } });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Đăng nhập thất bại",
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Đăng nhập thất bại",
    });
  }
};

// Logout action
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
