import React from "react";
import "./KoiBreeders.scss";
import koibreeder from "../../../assets/koibreeder/koibreeeder.jpg";

const BreedersList = [
  {
      id: 1,
      name: "Koi Breeder 1",
      image: koibreeder,
      description: "Expert in Kohaku and Sanke varieties",
  },
  {
      id: 2,
      name: "Koi Breeder 2",
      image: koibreeder,
      description: "Specializes in rare Gin Rin koi",
  },
  {
      id: 3,
      name: "Koi Breeder 3",
      image: koibreeder,
      description: "Known for high-quality Showa koi",
  },
  {
      id: 4,
      name: "Koi Breeder 4",
      image: koibreeder,
      description: "Focuses on butterfly koi breeding",
  },
  {
      id: 5,
      name: "Koi Breeder 5",
      image: koibreeder,
      description: "Produces award-winning Taisho Sanshoku",
  },
  {
      id: 6,
      name: "Koi Breeder 6",
      image: koibreeder,
      description: "Specializes in Doitsu koi varieties",
  },
  {
      id: 7,
      name: "Koi Breeder 7",
      image: koibreeder,
      description: "Expert in Asagi and Shusui breeding",
  },
  {
      id: 8,
      name: "Koi Breeder 8",
      image: koibreeder,
      description: "Focuses on Ogon and metallic koi",
  },
  {
      id: 9,
      name: "Koi Breeder 9",
      image: koibreeder,
      description: "Produces high-quality Kumonryu koi",
  },
  {
      id: 10,
      name: "Koi Breeder 10",
      image: koibreeder,
      description: "Specializes in Kikokuryu and Beni Kikokuryu",
  },
]

const KoiBreeders = () => {
  return (
    <div className="koi-breeders">
      <h1 className="koi-breeders_title">Koi Breeders</h1>
      <div className="koi-breeders__intro">
        <h2>Những Nhà Lai Tạo Cá Koi Nổi Tiếng</h2>
        <p>Nếu bạn đang tìm kiếm những chú cá Koi đẹp và khỏe mạnh để thêm vào hồ cá của mình, mạng lưới các nhà lai tạo uy tín của chúng tôi cung cấp đa dạng các giống cá Koi cao cấp. Dù bạn đang tìm kiếm những chú cá Koi sặc sỡ, đạt chất lượng trình diễn hay những giống cá bền bỉ cho hồ cá riêng, các nhà lai tạo của chúng tôi đều mang đến những chú cá hàng đầu với màu sắc, kích thước và sức khỏe vượt trội.</p>
        <h3>Nhấn vào hình ảnh để xem chi tiết.</h3>
      </div>

      <div className="koi-breeders__list">
        {BreedersList.map((breeder) => (
          <div key={breeder.id} className="koi-breeder-card">
            <div className="koi-breeder-card__image">
              <img src={breeder.image || 'https://via.placeholder.com/150'} alt={breeder.name} />
            </div>
            <div className="koi-breeder-card__info">
              <h3>{breeder.name}</h3>
              <p><strong></strong> {breeder.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KoiBreeders;
