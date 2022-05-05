import React from "react";

function Item({ item, onItemUpdate, onDeleteItem }) {
  function handleAddToCartButtonClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isInCart: !item.isInCart }),
    })
      .then((res) => res.json())
      .then((item) => onItemUpdate(item));
  }
  function handleDeleteButtonClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(() => onDeleteItem(item.id));
  }
  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartButtonClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteButtonClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
