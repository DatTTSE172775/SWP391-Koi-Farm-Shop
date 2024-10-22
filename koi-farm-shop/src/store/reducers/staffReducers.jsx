import {
  FETCH_STAFF_FAILURE,
  FETCH_STAFF_REQUEST,
  FETCH_STAFF_SUCCESS,
} from "../actions/staffActions";

const initialState = {
  staff: [],
  loading: false,
  error: null,
};

const staffReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STAFF_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_STAFF_SUCCESS:
      return { ...state, loading: false, staff: action.payload };

    case FETCH_STAFF_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default staffReducer;
