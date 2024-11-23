import {
    GET_ALL_VARIETIES_REQUEST,
    GET_ALL_VARIETIES_SUCCESS,
    GET_ALL_VARIETIES_FAILURE,
    FETCH_KOI_PACKAGES_REQUEST,
    FETCH_KOI_PACKAGES_SUCCESS,
    FETCH_KOI_PACKAGES_FAILURE,
    FETCH_KOI_PACKAGE_REQUEST,
    FETCH_KOI_PACKAGE_SUCCESS,
    FETCH_KOI_PACKAGE_FAILURE,
} from '../actions/KoiActions';

const initialState = {
    loading: false,
    koiPackages: [],
    koiPackage: null,
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
        case FETCH_KOI_PACKAGES_REQUEST:
            return {...state, loading: true, error: null};
        case FETCH_KOI_PACKAGES_SUCCESS:
            return {...state, loading: false, koiPackages: action.payload};
        case FETCH_KOI_PACKAGES_FAILURE:
            return {...state, loading: false, error: action.payload};
        case FETCH_KOI_PACKAGE_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_KOI_PACKAGE_SUCCESS:
            return { ...state, loading: false, koiPackage: action.payload };
        case FETCH_KOI_PACKAGE_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default koiReducers;