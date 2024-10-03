import React from "react";
import { useNavigate } from "react-router-dom";
import "./Consignment.scss";

const Consignment = () => {
  const navigate = useNavigate();

  const handleConsignmentClick = () => {
    navigate("/consign-form");
  };

  return (
    <div className="consignment-page">
      <div className="sections-container">
        <section className="offlineSection">
          <h2>Quy trình ký gửi Offline</h2>
          <ul>
            <li>
              <strong>Bước 1: Gửi yêu cầu ký gửi</strong>
              <p>Khách hàng truy cập trang web và điền form đăng ký...</p>
            </li>
            <li>
              <strong>Bước 2: Kiểm tra và phê duyệt yêu cầu</strong>
              <p>
                Trang trại nhận được yêu cầu ký gửi và kiểm tra các thông tin...
              </p>
            </li>
            <li>
              <strong>Bước 3: Thỏa thuận và ký hợp đồng</strong>
              <p>Sau khi kiểm tra, trang trại thỏa thuận với khách hàng...</p>
            </li>
            <li>
              <strong>Bước 4: Gửi cá Koi đến trang trại</strong>
              <p>
                Khách hàng mang cá Koi đến trang trại hoặc trang trại đến lấy
                cá...
              </p>
            </li>
            <li>
              <strong>Bước 5: Chăm sóc cá Koi</strong>
              <p>
                Trong quá trình ký gửi, trang trại chăm sóc cá theo yêu cầu...
              </p>
            </li>
            <li>
              <strong>Bước 6: Kết thúc ký gửi</strong>
              <p>
                Khách hàng đến trang trại để nhận lại cá hoặc trang trại giao
                đến nhà...
              </p>
            </li>
          </ul>
        </section>

        <section className="onlineSection">
          <h2>Quy trình ký gửi Online</h2>
          <ul>
            <li>
              <strong>Bước 1: Gửi yêu cầu ký gửi</strong>
              <p>Khách hàng truy cập trang web và điền form đăng ký...</p>
            </li>
            <li>
              <strong>Bước 2: Kiểm tra và phê duyệt yêu cầu</strong>
              <p>
                Trang trại nhận được yêu cầu ký gửi và kiểm tra các thông tin...
              </p>
            </li>
            <li>
              <strong>Bước 3: Thỏa thuận và ký hợp đồng</strong>
              <p>Sau khi kiểm tra, trang trại thỏa thuận với khách hàng...</p>
            </li>
            <li>
              <strong>Bước 4: Đăng bán cá Koi trên hệ thống</strong>
              <p>
                Trang trại đưa cá Koi lên hệ thống để bán theo yêu cầu của khách
                hàng...
              </p>
            </li>
            <li>
              <strong>Bước 5: Quản lý thông tin</strong>
              <p>Trang trại cập nhật tình trạng cá Koi định kỳ...</p>
            </li>
          </ul>
        </section>
      </div>
      <button className="consignment-button" onClick={handleConsignmentClick}>
        Ký gửi ngay
      </button>{" "}
    </div>
  );
};

export default Consignment;
