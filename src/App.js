import React, { useState } from "react";
import data from "./data";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exist = cart.find((x) => x.id === item.id);

    if (exist) {
      setCart(
        cart.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  const renderSection = (category, type) => {
    return data
      .filter(
        (item) =>
          item.category === category &&
          item.type === type
      )
      .map((item) => (
        <div className="card" key={item.id}>
          {item.bestSeller && (
            <span className="badge">
              🔥 Best Seller
            </span>
          )}

          <img src={item.image} alt={item.title} />

          <h3>{item.title}</h3>

          <p>⭐ {item.rating}</p>

          <p>₹{item.price}</p>

          <button onClick={() => addToCart(item)}>
            Add To Cart
          </button>
        </div>
      ));
  };

  return (
    <div className="container">
      <div className="banner">
        <h1>🍽️ Anjali's Restaurant</h1>
        <p>Fresh Food • Fast Delivery • Great Taste</p>
      </div>

      <h2>🌅 Breakfast</h2>

      <h3>🥗 Veg</h3>
      <div className="menu-grid">
        {renderSection("Breakfast", "Veg")}
      </div>

      <h3>🍗 Non-Veg</h3>
      <div className="menu-grid">
        {renderSection("Breakfast", "Non-Veg")}
      </div>

      <h2>🍛 Lunch</h2>

      <h3>🥗 Veg</h3>
      <div className="menu-grid">
        {renderSection("Lunch", "Veg")}
      </div>

      <h3>🍗 Non-Veg</h3>
      <div className="menu-grid">
        {renderSection("Lunch", "Non-Veg")}
      </div>

      <h2>🌙 Dinner</h2>

      <h3>🥗 Veg</h3>
      <div className="menu-grid">
        {renderSection("Dinner", "Veg")}
      </div>

      <h3>🍗 Non-Veg</h3>
      <div className="menu-grid">
        {renderSection("Dinner", "Non-Veg")}
      </div>

      <div className="cart">
        <h2>🛒 Cart ({totalItems} Items)</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.id}>
              <p>
                {item.title} - ₹{item.price}
              </p>

              <button onClick={() => decreaseQty(item.id)}>
                -
              </button>

              <span> {item.qty} </span>

              <button onClick={() => increaseQty(item.id)}>
                +
              </button>
            </div>
          ))
        )}

        <h2>Total Bill: ₹{total}</h2>

        <button className="order-btn">
          Place Order
        </button>
      </div>
    </div>
  );
}

export default app;