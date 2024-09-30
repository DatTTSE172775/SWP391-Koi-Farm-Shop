import React from "react";
import "./Koi-List-Page.scss";

const KoiListPage = () => {
  return (
    <div className="koi-list-page">
      <h1>Danh Sách Cá Koi</h1>
      <p>Đây là trang hiển thị danh sách các cá Koi.</p>
      {/* Có thể thêm nội dung tĩnh hoặc hình ảnh minh họa nếu cần */}
      <div className="koi-list-placeholder">
        <p>Hiện chưa có dữ liệu, vui lòng kiểm tra lại sau.</p>
      </div>
    </div>
  );
};

export default KoiListPage;
