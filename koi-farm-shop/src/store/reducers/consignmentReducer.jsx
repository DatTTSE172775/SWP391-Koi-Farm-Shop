import {
    FETCH_CONSIGNMENTS_REQUEST,
    FETCH_CONSIGNMENTS_SUCCESS,
    FETCH_CONSIGNMENTS_FAILURE,
    CREATE_CONSIGNMENT_REQUEST,
    CREATE_CONSIGNMENT_SUCCESS,
    CREATE_CONSIGNMENT_FAILURE,
  } from '../actions/consignmentActions';
  
  const initialState = {
    consignments: [],
    consignment: null,
    loading: false,
    error: null,
  };
  
  const consignmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CONSIGNMENT_REQUEST:
      case FETCH_CONSIGNMENTS_REQUEST:
        return { ...state, loading: true, error: null };
      case CREATE_CONSIGNMENT_SUCCESS:
        return { ...state, loading: false, consignment: action.payload };
      case FETCH_CONSIGNMENTS_SUCCESS:
        return { ...state, loading: false, consignments: action.payload };
      case CREATE_CONSIGNMENT_FAILURE:
      case FETCH_CONSIGNMENTS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default consignmentReducer;
