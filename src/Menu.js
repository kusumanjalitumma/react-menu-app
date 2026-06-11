import React from "react";

const Menu = ({ items }) => {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <div className="card" key={item.id}>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.category}</p>
          <p>₹{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Menu;