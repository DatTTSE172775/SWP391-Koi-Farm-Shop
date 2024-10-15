import axios from "axios";
import { useState } from "react";
import "./Consignment.scss";

const ConsignmentForm = () => {
  const [formData, setFormData] = useState({
    customerID: "", // You might want to get this from the user's session
    koiID: "", // You might want to create a separate form or API to create a new Koi first
    consignmentType: "Care",
    consignmentMode: "Offline",
    priceAgreed: "",
    pickupDate: "",
    notes: "",
    name: "",
    phone: "",
    email: "",
    koiBreed: "",
    koiColor: "",
    koiAge: "",
    koiSize: "",
    description: "",
    image: null,
    money: "",
  });

  //Xử lý back-end
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/consignments", {
        customerID: formData.customerID,
        koiID: formData.koiID,
        consignmentType: formData.consignmentType,
        consignmentMode: formData.consignmentMode,
        priceAgreed: formData.priceAgreed,
        pickupDate: formData.pickupDate,
        notes: formData.notes,
      });
      console.log(response.data);
      alert("Consignment created successfully");
      // Reset form or redirect user
    } catch (error) {
      console.error("Error creating consignment:", error);
      alert("Error creating consignment");
    }
  };

  const formatCurrency = (value) => {
    // Remove non-digit characters
    const number = value.replace(/\D/g, "");
    // Format number with thousands separators
    return new Intl.NumberFormat("vi-VN").format(number);
  };

  const handleMoneyChange = (e) => {
    const formattedValue = formatCurrency(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      money: formattedValue,
    }));
  };

  return (
    <div className="consign-form">
      <h2>Ký gửi cá Koi</h2>
      <form onSubmit={handleSubmit}>
        <div className="customer-info">
          <div className="form-group">
            <label>Tên của bạn</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              placeholder="Nhập số điện thoại 10 chữ số"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@email.com"
              required
            />
          </div>
        </div>

        <div className="koi-info">
          <div className="form-group">
            <label>Giống cá Koi</label>
            <input
              type="text"
              name="koiBreed"
              value={formData.koiBreed}
              onChange={handleInputChange}
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
            />
          </div>

          <div className="form-group">
            <label>Số tiền ký gửi mong muốn (VND)</label>
            <div className="input-wrapper">
              <input
                type="text"
                id="money"
                name="money"
                value={formData.money}
                onChange={handleMoneyChange}
                required
              />
              <span className="currency-symbol">Đồng</span>
            </div>
          </div>

          <div className="form-group desc">
            <label>Ghi chú</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              style={{ resize: "none" }}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Loại ký gửi</label>
          <select
            name="consignmentType"
            value={formData.consignmentType}
            onChange={handleInputChange}
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
          >
            <option value="Offline">Offline</option>
            <option value="Online">Online</option>
          </select>
        </div>

        <div className="form-group">
          <label>Giá thỏa thuận</label>
          <input
            type="number"
            name="priceAgreed"
            value={formData.priceAgreed}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Ngày nhận cá</label>
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Ghi chú</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            style={{ resize: "none" }}
          />
        </div>

        <button type="submit">Gửi yêu cầu ký gửi</button>
      </form>
    </div>
  );
};

export default ConsignmentForm;
