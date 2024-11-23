import axios from "axios";

// Fetch danh sách tỉnh/thành phố
export const fetchProvinces = () => async (dispatch) => {
    try {
        const response = await axios.get("https://provinces.open-api.vn/api/?depth=1");
        dispatch({
            type: "FETCH_PROVINCES_SUCCESS",
            payload: response.data,
        });
    } catch (error) {
        console.error("Error fetching provinces:", error);
        dispatch({ type: "FETCH_PROVINCES_FAILURE", payload: error.message });
    }
};

// Fetch danh sách quận/huyện theo tỉnh
export const fetchDistricts = (provinceCode) => async (dispatch) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`);
        dispatch({
            type: "FETCH_DISTRICTS_SUCCESS",
            payload: response.data.districts,
        });
    } catch (error) {
        console.error("Error fetching districts:", error);
        dispatch({ type: "FETCH_DISTRICTS_FAILURE", payload: error.message });
    }
};

// Fetch danh sách phường/xã theo quận/huyện
export const fetchWards = (districtCode) => async (dispatch) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`);
        dispatch({
            type: "FETCH_WARDS_SUCCESS",
            payload: response.data.wards,
        });
    } catch (error) {
        console.error("Error fetching wards:", error);
        dispatch({ type: "FETCH_WARDS_FAILURE", payload: error.message });
    }
};
