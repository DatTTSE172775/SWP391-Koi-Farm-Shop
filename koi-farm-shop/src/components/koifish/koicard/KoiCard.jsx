import React from "react";
import "./KoiCard.scss";

const KoiCard = ({ koi }) => {
  return (
    <div className="koi-card">
      <img src={koi.imageUrl} alt={koi.name} className="koi-image" />
      <h2>{koi.name}</h2>
      <p>{koi.description}</p>
    </div>
  );
};

export default KoiCard;
