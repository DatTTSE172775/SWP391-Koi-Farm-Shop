import React from "react";
import "./guide.scss";

import checkout from "../../assets/userGuide/cart.png";
import items from "../../assets/userGuide/koiList.png";
import register1 from "../../assets/userGuide/login.png";
import others from "../../assets/userGuide/others.png";
import register2 from "../../assets/userGuide/register.png";

const Guide = () => {
  return (
    <div className="guide-container">
      <h1 className="guide-title">-----------------------</h1>
      <div className="guide-intro">
        <h1 className="guide-title">Hướng dẫn cho người dùng mới</h1>
        <p>
        Nếu bạn mới truy cập trang web của chúng tôi, bạn đã đến đúng nơi rồi! 
        Hướng dẫn toàn diện của chúng tôi được thiết kế để giúp bạn điều hướng
        hành trình thú vị của việc nuôi dưỡng, duy trì và tận hưởng một chú cá koi tuyệt đẹp.
        </p>
      </div>

      <div className="guide-step">
        <h2>Bước 1: Tạo tài khoản</h2>
        <p>
        Để bắt đầu, bạn cần tạo một tài khoản trên trang web của chúng tôi. Điều này
        cho phép bạn truy cập tất cả các tính năng và dịch vụ chúng tôi cung cấp. Nhấp vào
        nút "Đăng ký", điền thông tin bắt buộc và tạo
        tài khoản của bạn.
        </p>
        <div className="guide-images">
          <img src={register1} alt="Login page" />
          <img src={register2} alt="Registration page" />
        </div>
      </div>

      <div className="guide-step">
        <h2>Bước 2: Khám phá sản phẩm</h2>
        <p>
        Sau khi đăng nhập, bạn có thể khám phá nhiều sản phẩm cá koi
        của chúng tôi. Từ thức ăn cho cá koi đến phụ kiện ao, chúng tôi có mọi thứ bạn
        cần để tạo nên một ao cá koi phát triển mạnh. Duyệt qua danh mục của chúng tôi và tìm
        những sản phẩm phù hợp nhất với nhu cầu của bạn.
        </p>
        <img src={items} alt="guide2" />
      </div>

      <div className="guide-step">
        <h2>Bước 3: Xem chi tiết sản phẩm</h2>
        <p>
        Khi bạn tìm thấy sản phẩm bạn quan tâm, hãy nhấp vào sản phẩm để
        xem thông tin chi tiết. Sau đó, bạn có thể thêm sản phẩm vào giỏ hàng và
        tiến hành thanh toán.
        </p>
        <img src={checkout} alt="guide3" />
      </div>

      <div className="guide-step">
        <h2>Bước 4: Thanh toán</h2>
        <p>
        Sau khi thêm sản phẩm vào giỏ hàng, bạn có thể tiến hành thanh toán.
        Quy trình thanh toán an toàn của chúng tôi đảm bảo giao dịch diễn ra suôn sẻ. Bạn có thể
        chọn thanh toán bằng tiền mặt hoặc chuyển khoản ngân hàng.
        </p>
        <img src={"https://via.placeholder.com/150"} alt="guide4" />
      </div>

      <div className="guide-features">
        <h2>Khám phá những chức năng khác !</h2>
        <p>Shop của chúng tôi có nhiều chức năng hơn bạn có thể khám phá, chẳng hạn như:</p>
        <ul>
          <li>Thức ăn cá Koi</li>
          <li>Vật dụng trang trí hồ cá Koi</li>
          <li>Thiết bị lọc hồ cá</li>
          <li>Ký gửi</li>
          <li>...Và nhiều hơn thế nữa!</li>
        </ul>
        <img src={others} alt="Other features" />
      </div>

      <div className="guide-contact">
        <h3>
          Nếu bạn có bất kỳ câu hỏi nào hãy{" "}
          <a href="/contact">Liên hệ với chúng tôi tại đây</a>
        </h3>
      </div>
    </div>
  );
};

export default Guide;
