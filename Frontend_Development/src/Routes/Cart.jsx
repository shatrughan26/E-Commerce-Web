import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => setCartItems(data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          <div className="col-md-8">
            {cartItems.map((item) => (
              <div key={item.id} className="card mb-3 shadow-sm">
                <div className="row g-0 align-items-center">
                  <div className="col-md-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded-start"
                      style={{ maxHeight: "120px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-9">
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text mb-1">Price: ₹{item.price}</p>
                      <p className="card-text mb-0">Quantity: {item.quantity}</p>
                      <p className="card-text">
                        <small className="text-muted">
                          Subtotal: ₹{item.price * item.quantity}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="col-md-4">
            <div className="card bg-light shadow-sm">
              <div className="card-body">
                <h4 className="card-title">Total Bill</h4>
                <hr />
                <p className="fs-5">₹ {calculateTotal()}</p>
                <button className="btn btn-success w-100 mt-3">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
