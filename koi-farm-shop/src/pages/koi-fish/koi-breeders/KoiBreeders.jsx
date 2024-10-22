import React, { useEffect, useState } from "react";
import "./KoiBreeders.scss";
import axiosPublic from "../../../api/axiosPublic";
import koibreeder from "../../../assets/koibreeder/koibreeeder.jpg"; // default image if not available


const KoiBreeders = () => {
  const [breeders, setBreeders] = useState([]); // Initialize state for breeders

  // Fetch breeders from the backend API
  useEffect(() => {
    const fetchBreeders = async () => {
      try {
        const breedersData = await axiosPublic.post("getAllKoiBreeders"); // Call to API to fetch breeders
        setBreeders(breedersData); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching breeders data:", error);
      }
    };

    fetchBreeders(); // Call the function on component mount
  }, []);

  return (
    <div className="koi-breeders">
      <h1 className="koi-breeders_title">Koi Breeders</h1>
      <div className="koi-breeders__intro">
        <h2>Những Nhà Lai Tạo Cá Koi Nổi Tiếng</h2>
        <p>
          Nếu bạn đang tìm kiếm những chú cá Koi đẹp và khỏe mạnh để thêm vào
          hồ cá của mình, mạng lưới các nhà lai tạo uy tín của chúng tôi cung cấp
          đa dạng các giống cá Koi cao cấp. Dù bạn đang tìm kiếm những chú cá
          Koi sặc sỡ, đạt chất lượng trình diễn hay những giống cá bền bỉ cho hồ
          cá riêng, các nhà lai tạo của chúng tôi đều mang đến những chú cá
          hàng đầu với màu sắc, kích thước và sức khỏe vượt trội.
        </p>
        <h3>Nhấn vào hình ảnh để xem chi tiết.</h3>
      </div>

      <div className="koi-breeders__list">
        {breeders.length > 0 ? (
          breeders.map((breeder) => (
            <div key={breeder.id} className="koi-breeder-card">
              <div className="koi-breeder-card__image">
                <img src={koibreeder || 'https://via.placeholder.com/150'} alt={breeder.name} />
              </div>
              <div className="koi-breeder-card__info">
                <h3>{breeder.Name}</h3> {/* Use the field names returned by the API */}
                <p>{breeder.ContactInfo}</p>
                <p><strong>Description:</strong> {breeder.Address}</p> {/* You can adjust these fields */}
              </div>
            </div>
          ))
        ) : (
          <p>Loading breeders...</p> // Display a message while data is being fetched
        )}
      </div>
    </div>
  );
};

export default KoiBreeders;
