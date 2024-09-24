import React from "react";
import { useParams } from "react-router-dom";
import "./KoiDetails.scss";

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

const KoiDetails = () => {
  const { id } = useParams();
  const koi = koiData.find((fish) => fish.id === parseInt(id));

  if (!koi) return <p>Koi fish not found!</p>;

  return (
    <div className="koi-details">
      <img src={koi.image} alt={koi.name} className="koi-details-image" />
      <h1>{koi.name}</h1>
      <p>{koi.description}</p>
      <p>Price: ${koi.price}</p>
    </div>
  );
};

export default KoiDetails;
