import {REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS} from "../actions/authActions";

const initialState = {
    isAuthenticated: false,
    loading: false,
    error: null,
    user: null,
    token: null,
    userId: null,
    forgetPasswordSuccess: false,
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
                userId: action.payload.userId,
                role: action.payload.role,
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
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "FORGET_PASSWORD_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
                forgetPasswordSuccess: false,
            };
        case "FORGET_PASSWORD_SUCCESS":
            return {
                ...state,
                loading: false,
                forgetPasswordSuccess: true,
            };
        case "FORGET_PASSWORD_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case "CHANGE_PASSWORD_REQUEST":
            return {
                ...state,
                loading: true,
                error: null,
            };
        case "CHANGE_PASSWORD_SUCCESS":
            return {
                ...state,
                loading: false,
            };
        case "CHANGE_PASSWORD_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;
