import axiosPublic from "../../api/axiosPublic";
import { useState, useEffect } from "react";
import "./Consignment.scss";

const ConsignmentForm = () => {
  const [formData, setFormData] = useState({
    customerID: "",
    koiID: "",
    consignmentType: "Care",
    consignmentMode: "Online",
    priceAgreed: "",
    notes: "",
    koiType: "",
    koiColor: "",
    koiAge: "",
    koiSize: "",
    image: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  // Add this useEffect hook to fetch the customerID when the component mounts
  // useEffect(() => {
  //   const fetchCustomerID = async () => {
  //     try {
  //       // const response = await axiosPublic.get("customer/id");
  //       setFormData(prevData => ({
  //         ...prevData,
  //         customerID: response.data.customerID
  //       }));
  //     } catch (error) {
  //       console.error("Error fetching customer ID:", error);
  //     }
  //   };

  //   fetchCustomerID();
  // }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      };
      console.log("Updated form data:", newData);  // Log the updated state
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'consignmentType') {
          formDataToSend.append(key, formData[key] || 'Care');  // Ensure a default value
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      // Log the form data before sending
      console.log("Form data being sent:", Object.fromEntries(formDataToSend));

      const response = await axiosPublic.post("createConsignment", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Response from server:", response.data);
      alert("Yêu cầu ký gửi đã được gửi thành công");
      // Reset form after successful submission, but keep the customerID
      setFormData(prevData => ({
        ...prevData,
        koiID: "",
        consignmentType: "Chăm sóc",
        consignmentMode: "Online",
        priceAgreed: "",
        notes: "",
        koiType: "",
        koiColor: "",
        koiAge: "",
        koiSize: "",
        image: null,
      }));
    } catch (error) {
      console.error("Lỗi khi tạo yêu cầu ký gửi:", error);
      alert("Đã xảy ra lỗi khi gửi yêu cầu ký gửi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="consign-form">
      <h2>Ký gửi cá Koi</h2>
      <form onSubmit={handleSubmit}>
        <div className="koi-info">
          
          <div className="form-group">
            <label>Giống cá Koi</label>
            <input
              type="text"
              name="koiType"
              value={formData.koiType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Màu cá Koi</label>
            <input
              type="text"
              name="koiColor"
              value={formData.koiColor}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Tuổi của cá Koi</label>
            <input
              type="text"
              name="koiAge"
              value={formData.koiAge}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Kích thước cá Koi</label>
            <input
              type="text"
              name="koiSize"
              value={formData.koiSize}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Hình ảnh cá Koi muốn ký gửi</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Loại ký gửi</label>
            <select
              name="consignmentType"
              value={formData.consignmentType}
              onChange={handleInputChange}
              required
            >
              <option value="Care">Chăm sóc</option>
              <option value="Sell">Bán</option>
            </select>
          </div>

          <div className="form-group">
            <label>Hình thức ký gửi</label>
            <select
              name="consignmentMode"
              value={formData.consignmentMode}
              onChange={handleInputChange}
              required
            >
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>

          <div className="form-group">
            <label>Số tiền ký gửi mong muốn (VND)</label>
            <input
              type="number"
              step="0.01"
              min="0"
              max="99999999.99"
              id="priceAgreed"
              name="priceAgreed"
              value={formData.priceAgreed}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group desc">
            <label>Ghi chú</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              style={{ resize: "none" }}
            />
          </div>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Đang gửi..." : "Gửi yêu cầu ký gửi"}
        </button>
      </form>
    </div>
  );
};

export default ConsignmentForm;
