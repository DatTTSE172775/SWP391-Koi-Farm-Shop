import axiosPublic from "../../api/axiosPublic";

export const GET_ALL_VARIETIES_REQUEST = 'GET_ALL_VARIETIES_REQUEST';
export const GET_ALL_VARIETIES_SUCCESS = 'GET_ALL_VARIETIES_SUCCESS';
export const GET_ALL_VARIETIES_FAILURE = 'GET_ALL_VARIETIES_FAILURE';

export const getAllVarieties = () => async (dispatch) => {
    dispatch({ type: GET_ALL_VARIETIES_REQUEST });

    try {
        const response = await axiosPublic.get('varieties'); // Gọi đúng instance `axiosPublic`
        dispatch({
            type: GET_ALL_VARIETIES_SUCCESS,
            payload: response.data,
        });
    } catch (error) {
        console.error("Error fetching varieties:", error.response || error.message);
        dispatch({
            type: GET_ALL_VARIETIES_FAILURE,
            payload: error.message,
        });
    }
};