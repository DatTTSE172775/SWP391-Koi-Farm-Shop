import axiosPublic from "../../api/axiosPublic";
import { useState, useCallback, useEffect } from "react";
import "./Consignment.scss";

const ConsignmentForm = () => {
  const [varieties, setVarieties] = useState([]);
  const [formData, setFormData] = useState({
    koiId: "",
    consignmentType: "Sale",
    consignmentMode: "Offline",
    priceAgreed: "",
    notes: "",
    koiType: "",
    koiColor: "",
    koiAge: "",
    koiSize: "",
    imageFile: null, // Store the file itself
    inspectionResult: "",
  });

  useEffect(() => {
    fetchVarieties();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: file, // Store the file directly
      }));
    }
  };

  const fetchVarieties = async () => {
    try {
      const response = await axiosPublic.get("/varieties");
      setVarieties(response.data);
    } catch (error) {
      console.error("Error fetching varieties:", error);
      alert("Failed to fetch varieties. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("koiId", formData.koiId);
    formDataObj.append("consignmentType", formData.consignmentType);
    formDataObj.append("consignmentMode", formData.consignmentMode);
    formDataObj.append("priceAgreed", formData.priceAgreed);
    formDataObj.append("notes", formData.notes);
    formDataObj.append("koiType", formData.koiType);
    formDataObj.append("koiColor", formData.koiColor);
    formDataObj.append("koiAge", formData.koiAge);
    formDataObj.append("koiSize", formData.koiSize);
    formDataObj.append("inspectionResult", formData.inspectionResult);
    if (formData.imageFile) {
      formDataObj.append("imageFile", formData.imageFile, formData.imageFile.name); // Include the file name
    }

    try {
      const response = await axiosPublic.post("createConsignment", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Consignment created:", response.data);
      setFormData({
        koiId: "",
        consignmentType: "Sale",
        consignmentMode: "Offline",
        priceAgreed: "",
        notes: "",
        koiType: "",
        koiColor: "",
        koiAge: "",
        koiSize: "",
        imageFile: null,
        inspectionResult: "",
      });
      alert("Consignment submitted successfully!");
    } catch (error) {
      console.error("Error submitting consignment:", error);
      alert(`Error submitting consignment: ${error.message}`);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    // Validate that the input is a valid number with up to 2 decimal places
    // and doesn't exceed 8 digits before the decimal point
    if (/^\d{0,8}(\.\d{0,2})?$/.test(value) || value === '') {
      setFormData(prevData => ({
        ...prevData,
        priceAgreed: value
      }));
    }
  };

  return (
    <div className="consignment-form">
      <h3>------------------------------------------------------------------------------------------------------</h3>
      <h1>Đơn Ký Gửi</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div>
            <label htmlFor="priceAgreed">Giá mong muốn (VNĐ):</label>
            <input
              type="number"
              id="priceAgreed"
              name="priceAgreed"
              value={formData.priceAgreed}
              onChange={handlePriceChange}
              step="0.01"
              min="0"
              max="99999999.99" // Maximum value for DECIMAL(10,2)
              required
              placeholder="0.00"
              className="price-input"
            />
          </div>
          <div>
            <label htmlFor="koiType">Loại Koi:</label>
            <select 
              id="koiType"
              name="koiType" 
              value={formData.koiType} 
              onChange={handleChange} 
              required
            >
              <option value="">Chọn loại</option>
              {varieties.map((variety) => (
                <option key={variety.VarietyID} value={variety.VarietyID}>
                  {variety.VarietyName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="koiColor">Màu sắc:</label>
            <input
              type="text"
              id="koiColor"
              name="koiColor"
              value={formData.koiColor}
              onChange={handleChange}
              required
              placeholder="Nhập màu sắc"
            />
          </div>
          <div>
            <label htmlFor="koiAge">Tuổi Koi:</label>
            <input
              type="text"
              id="koiAge"
              name="koiAge"
              value={formData.koiAge}
              onChange={handleChange}
              required
              placeholder="Nhập tuổi"
            />
          </div>
        </div>

        <div>
          <label htmlFor="koiSize">Kích thước Koi:</label>
          <input
            type="text"
            id="koiSize"
            name="koiSize"
            value={formData.koiSize}
            onChange={handleChange}
            required
            placeholder="Nhập kích thước"
          />
        </div>

        <div>
          <label htmlFor="notes">Ghi chú:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Nhập ghi chú về cá Koi của bạn"
          ></textarea>
        </div>

        <div>
          <label htmlFor="imageFile">Ảnh Koi:</label>
          <input
            type="file"
            id="imageFile"
            name="imageFile"
            accept="image/*"
            onChange={handleFileChange}
          />
          {formData.imageFile && (
            <div className="image-preview">
              <img
                src={URL.createObjectURL(formData.imageFile)}
                alt="Koi preview"
                style={{ width: "200px", height: "auto" }}
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="inspectionResult">Sức Khỏe Cá:</label>
          <textarea
            id="inspectionResult"
            name="inspectionResult"
            value={formData.inspectionResult}
            onChange={handleChange}
            placeholder="Nhập thông tin về sức khỏe của cá"
          ></textarea>
        </div>

        <button type="submit">Nộp đơn ký gửi</button>
      </form>
    </div>
  );
};

export default ConsignmentForm;
