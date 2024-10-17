const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  user: null,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.username,
        token: action.payload.token,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
        user: null,
        token: null,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
