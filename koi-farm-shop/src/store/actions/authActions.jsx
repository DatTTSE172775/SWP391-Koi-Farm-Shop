import axiosPublic from "../../api/axiosPublic";

// ACTION TYPES
//login
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

//register
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

// ACTIONS CREATOR
// Login action
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    console.log('Attempting login with:', { username, password: '*****' });
    const response = await axiosPublic.post("signin", {
      username,
      password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('Login response:', response.data);

    if (response.data && response.data.token) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Đăng nhập thất bại: Không nhận được token",
      });
    }
  } catch (error) {
    console.error('Login error:', error.response?.data || error);
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
