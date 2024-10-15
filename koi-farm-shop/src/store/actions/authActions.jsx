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

  return new Promise(async (resolve, reject) => {
    try {
      const response = await axiosPublic.post("/auth/login", {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        const { token, username } = response.data;

        dispatch({ type: LOGIN_SUCCESS, payload: { username, token } });
        resolve();
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: "Đăng nhập thất bại",
        });
        reject("Đăng nhập thất bại");
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.response?.data?.message || "Đăng nhập thất bại",
      });
      reject(error.response?.data?.message || "Đăng nhập thất bại");
    }
  });
};

// Register action
export const register =
  (username, password, fullname, phone, email) => async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axiosPublic.post("/auth/register", {
          username,
          password,
          fullname,
          phone,
          email,
        });

        if (response.status === 201) {
          dispatch({ type: REGISTER_SUCCESS, payload: response.data });
          resolve(); // Registration successful
        } else {
          dispatch({
            type: REGISTER_FAILURE,
            payload: "Đăng ký thất bại",
          });
          reject("Đăng ký thất bại"); // Registration failed
        }
      } catch (error) {
        dispatch({
          type: REGISTER_FAILURE,
          payload: error.response?.data?.message || "Đăng ký thất bại",
        });
        reject(error.response?.data?.message || "Đăng ký thất bại");
      }
    });
  };

// Logout action
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
