import {
  FETCH_USER_FAILURE,
  FETCH_USER_SUCCESS,
} from "../actions/accountActions";

const initialState = {
  user: null,
  error: null,
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case FETCH_USER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
