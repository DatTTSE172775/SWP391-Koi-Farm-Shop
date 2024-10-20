import axiosPublic from "../../api/axiosPublic";
import { useState } from "react";
import "./Consignment.scss";

const ConsignmentForm = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    koiId: "",
    consignmentType: "",
    consignmentMode: "",
    priceAgreed: "",
    notes: "",
    koiType: "",
    koiColor: "",
    koiAge: "",
    koiSize: "",
    imagePath: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPublic.post("createConsignment", formData);
      console.log("Consignment created:", response.data);
      // Reset form or show success message
      setFormData({
        customerId: "",
        koiId: "",
        consignmentType: "",
        consignmentMode: "",
        priceAgreed: "",
        notes: "",
        koiType: "",
        koiColor: "",
        koiAge: "",
        koiSize: "",
        imagePath: "",
      });
      alert("Consignment submitted successfully!");
    } catch (error) {
      console.error("Error submitting consignment:", error);
      alert("Error submitting consignment. Please try again.");
    }
  };

  return (
    <div className="consignment-form">
      <h1>--------------------------------</h1>
      <h1>Consignment Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {/* TODO: tran web nên tự lấy customerID */}
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="number"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          {/* TODO: Xóa nhập KoiID ? */}
          <label htmlFor="koiId">Koi ID:</label>
          <input
            type="number"
            id="koiId"
            name="koiId"
            value={formData.koiId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="consignmentType">Consignment Type:</label>
          <input
            type="text"
            id="consignmentType"
            name="consignmentType"
            value={formData.consignmentType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="consignmentMode">Consignment Mode:</label>
          <input
            type="text"
            id="consignmentMode"
            name="consignmentMode"
            value={formData.consignmentMode}
            onChange={handleChange}
            required
          />
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
        {/* New fields */}
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
          {/* TODO: Add image upload */}
          <label htmlFor="imagePath">Image Path:</label> 
          <input
            type="file"
            id="imagePath"
            name="imagePath"
            value={formData.imagePath}
            // onChange={}
          />
        </div>
        <button type="submit">Submit Consignment</button>
      </form>
    </div>
  );
};

export default ConsignmentForm;
