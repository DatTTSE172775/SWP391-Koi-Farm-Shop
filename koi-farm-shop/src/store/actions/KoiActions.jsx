import axiosPublic from "../../api/axiosPublic";

export const GET_ALL_VARIETIES_REQUEST = 'GET_ALL_VARIETIES_REQUEST';
export const GET_ALL_VARIETIES_SUCCESS = 'GET_ALL_VARIETIES_SUCCESS';
export const GET_ALL_VARIETIES_FAILURE = 'GET_ALL_VARIETIES_FAILURE';
export const FETCH_KOI_PACKAGES_REQUEST = "FETCH_KOI_PACKAGES_REQUEST";
export const FETCH_KOI_PACKAGES_SUCCESS = "FETCH_KOI_PACKAGES_SUCCESS";
export const FETCH_KOI_PACKAGES_FAILURE = "FETCH_KOI_PACKAGES_FAILURE";
export const FETCH_KOI_PACKAGE_REQUEST = "FETCH_KOI_PACKAGE_REQUEST";
export const FETCH_KOI_PACKAGE_SUCCESS = "FETCH_KOI_PACKAGE_SUCCESS";
export const FETCH_KOI_PACKAGE_FAILURE = "FETCH_KOI_PACKAGE_FAILURE";

// Action Creators
const fetchKoiPackagesRequest = () => ({ type: FETCH_KOI_PACKAGES_REQUEST });
const fetchKoiPackagesSuccess = (packages) => ({
    type: FETCH_KOI_PACKAGES_SUCCESS,
    payload: packages,
});
const fetchKoiPackagesFailure = (error) => ({
    type: FETCH_KOI_PACKAGES_FAILURE,
    payload: error,
});
const fetchKoiPackageRequest = () => ({ type: FETCH_KOI_PACKAGE_REQUEST });
const fetchKoiPackageSuccess = (packageData) => ({
    type: FETCH_KOI_PACKAGE_SUCCESS,
    payload: packageData,
});
const fetchKoiPackageFailure = (error) => ({
    type: FETCH_KOI_PACKAGE_FAILURE,
    payload: error,
});

// Thunk Action to Fetch Koi Packages
export const fetchKoiPackages = () => async (dispatch) => {
    dispatch(fetchKoiPackagesRequest());

    try {
        const response = await axiosPublic.get("/koipackages");
        dispatch(fetchKoiPackagesSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchKoiPackagesFailure(error.message || "Failed to fetch koi packages"));
    }
};

// Thunk Action to Fetch Koi Package by ID
export const fetchKoiPackageById = (packageId) => async (dispatch) => {
    dispatch(fetchKoiPackageRequest());

    try {
        const response = await axiosPublic.get(`/koipackages/${packageId}`);
        dispatch(fetchKoiPackageSuccess(response.data.data));
    } catch (error) {
        dispatch(fetchKoiPackageFailure(error.message || "Failed to fetch koi package"));
    }
};

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