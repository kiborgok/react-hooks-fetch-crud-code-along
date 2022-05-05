import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((res) => res.json())
      .then((items) => setItems(items));
  },[]);

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const hanleItemUpdate = (updatedItem) => {
    setItems(
      items.map((item) => (updatedItem.id === item.id ? updatedItem : item))
    );
  };

  const handleDelete = (deletedItemId) => {
    console.log(deletedItemId)
    setItems(items.filter((item) => item.id !== deletedItemId));
  };

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onDeleteItem={handleDelete}
            onItemUpdate={hanleItemUpdate}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
