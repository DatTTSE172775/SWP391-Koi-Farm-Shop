import React from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.scss";

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

const ProductDetails = () => {
  const { id } = useParams();
  const product = productData.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-details">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={() => alert(`${product.name} added to cart!`)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
