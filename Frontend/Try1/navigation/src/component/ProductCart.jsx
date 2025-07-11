import React, { useEffect, useState } from "react";
import "./productCard.css";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + delta, 1),
    }));
  };

  const handleAddToCart = (product) => {
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        ...product,
        quantity: quantities[product.id] || 1,
      },
    }));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-img" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p><strong>₹{product.price}</strong></p>

          <div className="quantity-control">
            <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
            <span>{quantities[product.id] || 1}</span>
            <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
          </div>

          <button className="buy-btn" onClick={() => handleAddToCart(product)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
