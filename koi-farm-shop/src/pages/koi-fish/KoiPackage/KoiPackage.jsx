import React from "react";
import "./KoiPackage.scss";
import KoiPackageItem1 from "../../../assets/images/Koipackage1.jpg";
import KoiPackageItem2 from "../../../assets/images/Koipackage2.jpg";
import KoiPackageItem3 from "../../../assets/images/Koipackage3.jpg";

const PackagesList = [
  {
    id: 1,
    name: "Premium Koi Package",
    image: KoiPackageItem1,
    description: "6 selected Koi with premium care for 3 months",
    price: "5,000,000 VNĐ",
    size: "30-40 cm",
    food: "High-quality Koi food",
    filterSystem: "Advanced filtration system",
    rating: 5,
    discount: 10,
  },
  {
    id: 2,
    name: "Standard Koi Package",
    image: KoiPackageItem2,
    description: "5 Koi with basic care and food for 2 months",
    price: "3,000,000 VNĐ",
    size: "20-30 cm",
    food: "Standard Koi food",
    filterSystem: "Basic filtration system",
    rating: 4,
    discount: 5,
  },
  {
    id: 3,
    name: "Starter Koi Package",
    image: KoiPackageItem3,
    description: "4 Koi with essential care package for 1 month",
    price: "2,000,000 VNĐ",
    size: "15-20 cm",
    food: "Basic Koi food",
    filterSystem: "Essential filtration system",
    rating: 3,
    discount: 0,
  },
];

const KoiPackage = () => {
  return (
    <div className="koi-package">
      {/* <h1 className="koi-package_title">Koi Packages</h1> */}
      <div className="koi-package__intro">
        <h2>Exclusive Koi Packages</h2>
        <p>
          Choose from our hand-selected Koi packages, each designed to provide
          the best care and quality for your pond.
        </p>
        <h3>Click on the image for more details</h3>
      </div>

      <div className="koi-package__list">
        {PackagesList.map((pkg) => (
          <div key={pkg.id} className="koi-package-card">
            {pkg.discount > 0 && <span className="discount-badge">{pkg.discount}% OFF</span>}
            <div className="koi-package-card__image">
              <img
                src={pkg.image || "https://via.placeholder.com/150"}
                alt={pkg.name}
              />
            </div>
            <div className="koi-package-card__info">
              <h3>{pkg.name}</h3>
              <p>{pkg.description}</p>
              <p><strong>Size:</strong> {pkg.size}</p>
              <p><strong>Food:</strong> {pkg.food}</p>
              <p><strong>Filter:</strong> {pkg.filterSystem}</p>
              <p className="koi-package-card__price">
                <strong>Price:</strong> {pkg.price}
              </p>
              <p className="rating">
                {Array(pkg.rating)
                  .fill("★")
                  .join("")}
                {Array(5 - pkg.rating)
                  .fill("☆")
                  .join("")}
              </p>
              <button className="buy-now-button">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KoiPackage;
