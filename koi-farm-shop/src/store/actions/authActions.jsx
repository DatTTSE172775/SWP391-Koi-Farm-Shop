import axiosPrivate from "../../api/axiosPrivate";
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

// forget-password
export const FORGET_PASSWORD_REQUEST = "FORGET_PASSWORD_REQUEST";
export const FORGET_PASSWORD_SUCCESS = "FORGET_PASSWORD_SUCCESS";
export const FORGET_PASSWORD_FAILURE = "FORGET_PASSWORD_FAILURE";

//change-password
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

// ACTIONS CREATOR
// Login action
export const login = (username, password) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    console.log("Attempting login with:", { username, password: "*****" });
    const response = await axiosPublic.post(
      "signin",
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Login response:", response.data);

    if (response.data && response.data.token) {
      // Save token, role, and userId to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userId", response.data.userId);

      // Dispatch success action with role and userId
      dispatch({ 
        type: LOGIN_SUCCESS, 
        payload: { 
          ...response.data, 
          username,
          userId: response.data.userId 
        } 
      });

      // Set token for future requests
      axiosPublic.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      // Return the role for navigation in the component
      return response.data.role;
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: "Đăng nhập thất bại: Không nhận được token",
      });
    }
  } catch (error) {
    console.error("Login error:", error.response?.data || error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response?.data?.message || "Đăng nhập thất bại",
    });
    throw error;
  }
};

// Logout action
export const logout = () => (dispatch) => {
  // Remove all auth-related items from localStorage
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("role"); //clear this item
  localStorage.removeItem("userId"); //clear this item
  
  // Clear authorization header
  delete axiosPublic.defaults.headers.common["Authorization"];
  
  // Dispatch logout action
  dispatch({ type: LOGOUT });
};

// Register action
export const register =
  (username, email, password, fullname, phone) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      console.log("Attempting registration with:", {
        username,
        email,
        password,
        fullname,
        phone,
      });
      const response = await axiosPublic.post(
        "signup",
        {
          username,
          email,
          password,
          fullname,
          phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Registration response:", response.data);

      if (response.data && response.data.message) {
        dispatch({ type: REGISTER_SUCCESS, payload: response.data.message });
        return response.data;
      } else {
        dispatch({
          type: REGISTER_FAILURE,
          payload: "Đăng ký thất bại: Không nhận được phản hồi hợp lệ",
        });
      }
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      dispatch({
        type: REGISTER_FAILURE,
        payload: error.response?.data?.message || "Đăng ký thất bại",
      });
    }
  };

// Add a new action to initialize auth state from localStorage
export const initializeAuth = () => (dispatch) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  if (token && role && userId) {
    // Restore the axios header
    axiosPublic.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
    // Dispatch login success with all necessary data
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        role,
        username,
        userId
      }
    });
  }
};

// Forget password action
export const forgetPassword = (email, username) => async (dispatch) => {
  dispatch({ type: FORGET_PASSWORD_REQUEST });

  try {
    const response = await axiosPublic.post("forgot-password", {
      email,
      userName: username,
    });

    console.log("Forget Password Response:", response.data);

    dispatch({ type: FORGET_PASSWORD_SUCCESS });
    alert("Yêu cầu đặt lại mật khẩu đã được gửi thành công.");
  } catch (error) {
    console.error("Forget Password Error:", error.response?.data || error);
    dispatch({
      type: FORGET_PASSWORD_FAILURE,
      payload: error.response?.data?.message || "Lỗi khi gửi yêu cầu.",
    });
  }
};

//change-password
export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_REQUEST });

    try {
      const response = await axiosPrivate.post("change-password", {
        oldPassword,
        newPassword,
      });

      console.log("Change Password Response:", response.data);

      dispatch({ type: CHANGE_PASSWORD_SUCCESS });
      alert("Mật khẩu của bạn đã được thay đổi thành công.");
    } catch (error) {
      console.error("Change Password Error:", error.response?.data || error);
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        payload: error.response?.data?.message || "Lỗi khi thay đổi mật khẩu.",
      });
    }
  };

  export const setUser = (userData) => ({
    type: 'SET_USER',
    payload: userData
  });
