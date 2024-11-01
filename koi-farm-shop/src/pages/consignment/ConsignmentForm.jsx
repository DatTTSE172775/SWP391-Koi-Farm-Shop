import axiosPublic from "../../api/axiosPublic";
import { useState, useCallback } from "react";
import "./Consignment.scss";

const ConsignmentForm = () => {
  const [formData, setFormData] = useState({
    koiId: "",
    consignmentType: "",
    consignmentMode: "Online",
    priceAgreed: "",
    notes: "",
    koiType: "",
    koiColor: "",
    koiAge: "",
    koiSize: "",
    imageFile: null, // Store the file itself
  });

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
        consignmentType: "",
        consignmentMode: "Online",
        priceAgreed: "",
        notes: "",
        koiType: "",
        koiColor: "",
        koiAge: "",
        koiSize: "",
        imageFile: null,
      });
      alert("Consignment submitted successfully!");
    } catch (error) {
      console.error("Error submitting consignment:", error);
      alert(`Error submitting consignment: ${error.message}`);
    }
  };

  return (
    <div className="consignment-form">
      <h1>--------------------------------</h1>
      <h1>Consignment Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="consignmentType">Consignment Type:</label>
          <select
            id="consignmentType"
            name="consignmentType"
            value={formData.consignmentType}
            onChange={handleChange}
            required
          >
            <option value="">Select type</option>
            <option value="Care">Care</option>
            <option value="Sell">Sell</option>
          </select>
        </div>

        <div>
          <label htmlFor="priceAgreed">Price Agreed:</label>
          <input
            type="number"
            id="priceAgreed"
            name="priceAgreed"
            value={formData.priceAgreed}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </div>
        <div>
          <label htmlFor="notes">Notes:</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="koiType">Koi Type:</label>
          <input
            type="text"
            id="koiType"
            name="koiType"
            value={formData.koiType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="koiColor">Koi Color:</label>
          <input
            type="text"
            id="koiColor"
            name="koiColor"
            value={formData.koiColor}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="koiAge">Koi Age:</label>
          <input
            type="text"
            id="koiAge"
            name="koiAge"
            value={formData.koiAge}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="koiSize">Koi Size:</label>
          <input
            type="text"
            id="koiSize"
            name="koiSize"
            value={formData.koiSize}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="imageFile">Image File:</label>
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
        <button type="submit">Submit Consignment</button>
      </form>
    </div>
  );
};

export default ConsignmentForm;
