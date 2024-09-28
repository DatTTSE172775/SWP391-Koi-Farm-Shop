import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.scss";

const productData = [
  {
    id: 1,
    name: "Fish Food",
    price: 25,
    description: "High-quality fish food",
    image: "fish-food.png",
  },
  {
    id: 2,
    name: "Pond Accessories",
    price: 100,
    description: "Decorate your pond",
    image: "fish-food.png",
  },
  {
    id: 3,
    name: "Decoration",
    price: 50,
    description: "Beautiful pond decorations",
    image: "fish-food.png",
  },
];

const ProductList = () => {
  const handleAddToCart = (productName) => {
    alert(`${productName} added to cart!`);
  };

  return (
    <div className="product-list">
      {productData.map((product) => (
        <div className="product-card" key={product.id}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <div className="product-actions">
            <button onClick={() => handleAddToCart(product.name)}>
              Add to Cart
            </button>
            <Link to={`/product-details/${product.id}`}>
              <button>View Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
