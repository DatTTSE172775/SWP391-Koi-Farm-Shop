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
      <h1>-----------------------------</h1>
      <h1>Hướng dẫn ký gửi cá Koi</h1>
      <p>
        Koi Farm Shop cung cấp dịch vụ ký gửi cá Koi cho những người nuôi cá nhưng 
        không có đủ mối quan hệ để trao đổi hay bán những chú Koi đẹp của mình. Dịch 
        vụ này đảm bảo rằng cá Koi sẽ được bán đúng giá trị cho những người thực sự đam 
        mê và đảm bảo cuộc sống tương lai tốt đẹp cho cá.
      </p>

      <h2>Các loại ký gửi:</h2>
      <p>
        Có hai phương pháp chính để ký gửi cá Koi:
      </p>
      <ul>
        <li>Ký gửi Offline: Phù hợp với những người nuôi Koi chưa có website hoặc phần mềm 
          quản lý chuyên nghiệp. Họ thường chỉ tham gia các diễn đàn Koi và muốn nâng cấp Koi 
          hoặc thay đổi kế hoạch cá nhân. Người gửi cần cung cấp thông tin chi tiết về cá Koi 
          bằng <b>hình ảnh, video và giấy chứng nhận.</b></li>

        <li>Ký gửi Online: Phù hợp với những người nuôi Koi để kinh doanh, đã có 
          hệ thống website và phần mềm quản lý. Họ ký gửi cá tại các trang trại Koi lớn để mở 
          rộng mạng lưới khách hàng.</li>
      </ul>

      <div>
        <h2>Các phương thức ký gửi đều phải đáp ứng các điều kiện sau:</h2>
        <ul>
        <li>Chụp ảnh và cung cấp video chi tiết về cá Koi.</li>
            <li>Cung cấp thông tin: Tên, tuổi, giới tính, nguồn gốc, chủng loại, tính cách, lượng thức ăn hàng ngày, các bệnh đã từng mắc (nếu có), và giấy chứng nhận.</li>
            <li>Koi Farm Shop có thể kiểm tra trực tiếp cá Koi.</li>
            <li>Thương thảo hợp đồng dựa trên yêu cầu và mức giá do khách hàng đưa ra.</li>
            <li>Ký hợp đồng và đảm bảo cá vẫn khỏe mạnh cho đến khi bán.</li>
            <li>Koi Farm Shop hỗ trợ khách hàng mua xem cá và chốt giao dịch.</li>
            <li>Khi cá được bán, hợp đồng kết thúc và người ký gửi chịu trách nhiệm về chất lượng cá sau khi bán.</li>
        </ul>
      </div>

      <div>
        <h2>Chính sách ký gửi:</h2>
        <ul>
          <li>Chỉ nhận cá Koi khỏe mạnh, không bệnh tật, có kích thước từ 35 - 90 cm, tùy thuộc vào dòng cá.</li>
          <li>Ưu tiên cá có giấy chứng nhận, đặc biệt là Koi thuần chủng từ Nhật Bản.</li>
          <li>Khách hàng ký gửi chịu trách nhiệm hoàn toàn về chất lượng, giấy chứng nhận, tuổi và sức khỏe của cá Koi.</li>
          <li>Koi Farm Shop cam kết cung cấp thông tin trung thực về tình trạng cá.</li>
          <li>Định giá cá dựa trên giá trị thực tế của thị trường.</li>
          <li>Phí ký gửi hợp lý và tương ứng với giá trị của cá.</li>
          <li>Tất cả các khách hàng ký gửi phải tuân thủ quy trình trên.</li>
        </ul>
      </div>

      <div>
        <h2>Tại sao nên ký gửi cá Koi ?</h2>
        <p>
        Ký gửi cá Koi là dịch vụ phổ biến tại Nhật Bản, nhưng hiện nay cũng đang phát 
        triển mạnh mẽ tại Việt Nam. Người chơi Koi muốn nâng cấp hoặc mở rộng đàn Koi 
        thường tìm đến dịch vụ ký gửi tại các trang trại lớn để tìm người mua.
        </p>
      </div>

      <div>
        <h2>Koi Farm Shop xin cám kết:</h2>
        <ul>
          <li>100% Koi F0 và F1 từ những trại nổi tiếng như Daihichi Koi Farm.</li>
          <li>Cá Koi đã được chọn lọc kỹ càng với tỷ lệ 300/10.000 con.</li>
          <li>Cung cấp đầy đủ kiến thức chăm sóc và thiết kế hồ cá trước khi bán Koi.</li>
          <li>Chỉ bán Koi khi hồ nuôi của khách hàng đạt chuẩn.</li>
          <li>Cam kết cung cấp hình ảnh và video chi tiết về nguồn gốc từng chú cá.</li>
          <li>Bồi thường gấp 10 lần giá trị cá nếu có vấn đề xảy ra.</li>
        </ul>
      </div>

      <div>
        <h3>Chính sách bảo hành:</h3>
        <ul>
          <li>Nếu khách hàng tự làm hồ và thả cá, thời gian bảo hành từ 2-5 ngày.</li>
          <li>Đối với hồ đạt chuẩn, có hệ thống ổn định, bảo hành dài hạn.</li>
          <li>Hỗ trợ tư vấn miễn phí về các bệnh liên quan đến cá Koi.</li>
        </ul>
      </div>
          <button className="consignment-button" onClick={handleConsignmentClick}>
          Ký gửi ngay</button>{" "}
    </div>
  );
};

export default Consignment;
