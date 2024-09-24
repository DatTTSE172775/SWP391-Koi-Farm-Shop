import React, { useState } from "react";
import "./Consignment.scss";

const ConsignmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    koiBreed: "",
    koiAge: "",
    koiSize: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="consignment-form">
      <h2>Form Đăng ký ký gửi</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Giống cá Koi</label>
          <input
            type="text"
            name="koiBreed"
            value={formData.koiBreed}
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
          <label>Mô tả thêm</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Gửi yêu cầu ký gửi</button>
      </form>
    </div>
  );
};

export default ConsignmentForm;
