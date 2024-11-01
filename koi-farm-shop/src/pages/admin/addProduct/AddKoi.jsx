import React, { useState, useEffect } from "react";
import axiosPublic from "../../../api/axiosPublic";
import { useNavigate } from "react-router-dom";
import "./AddProds.scss";

const AddKoi = () => {
  const [breeders, setBreeders] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    varietyId: "",
    origin: "",
    breederId: "",
    gender: "",
    born: "",
    size: "",
    price: "",
    weight: "",
    personality: "",
    feedingAmountPerDay: "",
    healthStatus: "",
    screeningRate: "",
    certificateLink: "",
    imageFile: null,
    availability: "Available",
  });

  useEffect(() => {
    fetchBreeders();
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      const response = await axiosPublic.get("/varieties");
      setVarieties(response.data);
    } catch (error) {
      console.error("Error fetching varieties:", error);
      alert("Failed to fetch varieties. Please try again.");
    }
  };

  const fetchBreeders = async () => {
    try {
      const response = await axiosPublic.get("/breeders");
      setBreeders(response.data);
    } catch (error) {
      console.error("Error fetching breeders:", error);
      alert("Failed to fetch breeders. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({
      ...formValues,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      
      // Validate required fields
      const requiredFields = ['name', 'varietyId', 'origin', 'breederId', 'gender', 'born', 'size', 'price'];
      for (const field of requiredFields) {
        if (!formValues[field]) {
          alert(`${field} is required!`);
          return;
        }
      }
      
      // Append all form values to formData
      Object.keys(formValues).forEach(key => {
        if (key === 'imageFile') {
          if (formValues.imageFile) {
            formData.append('imageFile', formValues.imageFile);
          }
        } else if (formValues[key] !== null && formValues[key] !== '') {
          // Convert numeric strings to numbers where appropriate
          if (['varietyId', 'breederId', 'born'].includes(key)) {
            formData.append(key, parseInt(formValues[key]));
          } else if (['size', 'price', 'weight', 'feedingAmountPerDay', 'screeningRate'].includes(key)) {
            formData.append(key, parseFloat(formValues[key]));
          } else {
            formData.append(key, formValues[key]);
          }
        }
      });

      const response = await axiosPublic.post("addKoiFish", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log("API Response:", response);
      
      alert("Koi fish added successfully!");
      // Reset form
      setFormValues({
        name: "",
        varietyId: "",
        origin: "",
        breederId: "",
        gender: "",
        born: "",
        size: "",
        price: "",
        weight: "",
        personality: "",
        feedingAmountPerDay: "",
        healthStatus: "",
        screeningRate: "",
        certificateLink: "",
        imageFile: null,
        availability: "Available",
      });
    } catch (error) {
      console.error("Error adding Koi fish:", error);
      console.error("Error response:", error.response);
      alert(`Failed to add Koi fish: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
      <div className="admin-content">
        <div className="add-container">
          <h2>Thêm cá Koi</h2>
          <div className="button-group">
            <button onClick={() => navigate("/admin/updateKoi")}>Cập nhật cá Koi</button>
            <button onClick={() => navigate("/admin/deleteKoi")}>Xóa cá Koi</button>
          </div>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Tên</label>
              <input name="name" value={formValues.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Loại</label>
              <select name="varietyId" value={formValues.varietyId} onChange={handleChange} required>
                <option value="">Chọn loại</option>
                {varieties.map((variety) => (
                  <option key={variety.VarietyID} value={variety.VarietyID}>
                    {variety.VarietyName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Xuất xứ</label>
              <select name="origin" value={formValues.origin} onChange={handleChange} required>
                <option value="">Chọn xuất xứ</option>
                <option value="Imported">Nhập khẩu</option>
                <option value="F1 Hybrid">Lai tạo F1</option>
                <option value="Pure Vietnamese">Thuần Việt</option>
              </select>
            </div>
            <div className="form-group">
              <label>Người nuôi</label>
              <select name="breederId" value={formValues.breederId} onChange={handleChange} required>
                <option value="">Chọn người nuôi</option>
                {breeders.map((breeder) => (
                  <option key={breeder.BreederID} value={breeder.BreederID}>
                    {breeder.Name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Giới tính</label>
              <select name="gender" value={formValues.gender} onChange={handleChange} required>
                <option value="">Chọn giới tính</option>
                <option value="Male">Đực</option>
                <option value="Female">Cái</option>
                <option value="Unknown">Không xác định</option>
              </select>
            </div>
            <div className="form-group">
              <label>Năm sinh</label>
              <input type="number" name="born" min="1900" max={new Date().getFullYear()} value={formValues.born} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Kích thước (cm)</label>
              <input type="number" name="size" min="0" step="0.1" value={formValues.size} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Giá</label>
              <input type="number" name="price" min="0" step="0.01" value={formValues.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Cân nặng (kg)</label>
              <input type="number" name="weight" min="0" step="0.1" value={formValues.weight} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Tính cách</label>
              <textarea name="personality" value={formValues.personality} onChange={handleChange}></textarea>
            </div>
            <div className="form-group">
              <label>Lượng thức ăn mỗi ngày (g)</label>
              <input type="number" name="feedingAmountPerDay" min="0" step="0.1" value={formValues.feedingAmountPerDay} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Tình trạng sức khỏe</label>
              <input name="healthStatus" value={formValues.healthStatus} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Tỷ lệ sàng lọc</label>
              <input type="number" name="screeningRate" min="0" max="100" step="0.1" value={formValues.screeningRate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Link chứng chỉ</label>
              <input name="certificateLink" value={formValues.certificateLink} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Hình ảnh</label>
              <input type="file" name="imageFile" accept="image/*" onChange={handleChange} />
              {formValues.imageFile && (
                <div className="image-preview">
                  <img src={URL.createObjectURL(formValues.imageFile)} alt="Koi preview" style={{ width: "200px", height: "auto", marginTop: "10px" }} />
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Trạng thái</label>
              <select name="availability" value={formValues.availability} onChange={handleChange}>
                <option value="Available">Có sẵn</option>
                <option value="Sold Out">Đã bán</option>
              </select>
            </div>
            <button type="submit">Thêm cá Koi</button>
          </form>
        </div>
    </div>
  );
};

export default AddKoi;
