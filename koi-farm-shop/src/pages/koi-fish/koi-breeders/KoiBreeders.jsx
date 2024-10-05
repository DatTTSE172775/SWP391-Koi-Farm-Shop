import React from "react";
import "./KoiBreeders.scss";

const BreedersList = [
  {
      id: 1,
      name: "Koi Breeder 1",
      image: "",
      description: "Expert in Kohaku and Sanke varieties",
  },
  {
      id: 2,
      name: "Koi Breeder 2",
      image: "",
      description: "Specializes in rare Gin Rin koi",
  },
  {
      id: 3,
      name: "Koi Breeder 3",
      image: "",
      description: "Known for high-quality Showa koi",
  },
  {
      id: 4,
      name: "Koi Breeder 4",
      image: "",
      description: "Focuses on butterfly koi breeding",
  },
  {
      id: 5,
      name: "Koi Breeder 5",
      image: "",
      description: "Produces award-winning Taisho Sanshoku",
  },
  {
      id: 6,
      name: "Koi Breeder 6",
      image: "",
      description: "Specializes in Doitsu koi varieties",
  },
  {
      id: 7,
      name: "Koi Breeder 7",
      image: "",
      description: "Expert in Asagi and Shusui breeding",
  },
  {
      id: 8,
      name: "Koi Breeder 8",
      image: "",
      description: "Focuses on Ogon and metallic koi",
  },
  {
      id: 9,
      name: "Koi Breeder 9",
      image: "",
      description: "Produces high-quality Kumonryu koi",
  },
  {
      id: 10,
      name: "Koi Breeder 10",
      image: "",
      description: "Specializes in Kikokuryu and Beni Kikokuryu",
  },
]

const KoiBreeders = () => {
  return (
    <div className="koi-breeders">
      <h1 className="koi-breeders_title">Koi Breeders</h1>
      <div className="koi-breeders__intro">
        <h2>Famous Koi Breeders</h2>
        <p>If you're looking to add beautiful, healthy koi to your pond, our trusted network of koi breeders offers a diverse selection of premium koi fish. Whether you're searching for vibrant, show-quality koi or hardy varieties for your personal pond, our breeders provide top-tier fish known for their color, size, and health.</p>
        <h3>Click on the image to view detail</h3>
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
