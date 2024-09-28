import React from "react";
import { Link } from "react-router-dom";
import "./KoiList.scss";

const koiData = [
  {
    id: 1,
    name: "Kohaku",
    price: 100,
    description: "A red and white Koi",
    image: "koi-fish.png",
  },
  {
    id: 2,
    name: "Sanke",
    price: 150,
    description: "A black, white and red Koi",
    image: "koi-fish.png",
  },
  {
    id: 3,
    name: "Sanke",
    price: 150,
    description: "A black, white and red Koi",
    image: "koi-fish.png",
  },
  {
    id: 4,
    name: "Sanke",
    price: 150,
    description: "A black, white and red Koi",
    image: "koi-fish.png",
  },
  {
    id: 5,
    name: "Sanke",
    price: 150,
    description: "A black, white and red Koi",
    image: "koi-fish.png",
  },
];

const KoiList = () => {
  const handleAddToCart = (koiName) => {
    alert(`${koiName} added to cart!`);
  };

  return (
    <div className="koi-list">
      {koiData.map((koi) => (
        <div className="koi-card" key={koi.id}>
          <img src={koi.image} alt={koi.name} className="koi-image" />
          <h2>{koi.name}</h2>
          <p>{koi.description}</p>
          <p>Price: ${koi.price}</p>
          <div className="koi-actions">
            <button onClick={() => handleAddToCart(koi.name)}>
              Add to Cart
            </button>
            <Link to={`/koi-details/${koi.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KoiList;
