import {
    GET_ALL_VARIETIES_REQUEST,
    GET_ALL_VARIETIES_SUCCESS,
    GET_ALL_VARIETIES_FAILURE,
} from '../actions/KoiActions';

const initialState = {
    loading: false,
    varieties: [],
    error: null,
};

const koiReducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_VARIETIES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_VARIETIES_SUCCESS:
            return {
                ...state,
                loading: false,
                varieties: action.payload,
            };
        case GET_ALL_VARIETIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default koiReducers;