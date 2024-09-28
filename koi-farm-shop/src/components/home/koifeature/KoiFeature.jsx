import React from "react";
import KoiCard from "../koicard/KoiCard";

const FeaturedKoi = () => {
  const dummyKoiList = [
    {
      name: "Koi Showa",
      imageUrl: "koi-fish.png",
      description:
        "A beautiful Koi with a mix of white, red, and black markings.",
    },
    {
      name: "Koi Kohaku",
      imageUrl: "koi-fish.png",
      description:
        "Koi with a striking red and white pattern, one of the most famous Koi.",
    },
    {
      name: "Koi Sanke",
      imageUrl: "koi-fish.png",
      description: "A vibrant Koi with red, white, and black markings.",
    },
  ];

  return (
    <div className="featured-koi">
      {dummyKoiList.map((koi, index) => (
        <KoiCard key={index} koi={koi} />
      ))}
    </div>
  );
};

export default FeaturedKoi;
