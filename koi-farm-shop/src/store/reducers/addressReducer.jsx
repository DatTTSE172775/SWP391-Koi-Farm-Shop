const initialState = {
    provinces: [],
    districts: [],
    wards: [],
    loading: false,
    error: null,
};

const addressReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_PROVINCES_SUCCESS":
            return { ...state, provinces: action.payload, loading: false };
        case "FETCH_DISTRICTS_SUCCESS":
            return { ...state, districts: action.payload, loading: false };
        case "FETCH_WARDS_SUCCESS":
            return { ...state, wards: action.payload, loading: false };
        case "FETCH_PROVINCES_FAILURE":
        case "FETCH_DISTRICTS_FAILURE":
        case "FETCH_WARDS_FAILURE":
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};

export default addressReducer;
