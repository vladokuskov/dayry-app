import { FormEvent, useState } from "react";
import { Item } from "../types/item.types";
import SectionContainer from "./SectionContainer/SectionContainer";

type IItemsList = {
  items: Item[];
  onItemSelect: (item: Item) => void;
  onItemAdd: (item: Item) => void;
  onItemDelete: (itemId: string) => void;
  selectedItemId?: string;
};

function ItemList({
  items,
  onItemAdd,
  onItemSelect,
  onItemDelete,
  selectedItemId,
}: IItemsList) {
  const [itemName, setItemName] = useState("");

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();
    const newItem = { id: Date.now().toString(), name: itemName, comments: [] };

    if (itemName.length) {
      onItemAdd(newItem);
    }

    setItemName("");
  };

  return (
    <SectionContainer title="Items">
      <form onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Type name here ..."
          aria-label="Enter item name"
          value={itemName}
          required
          onChange={(e) => setItemName(e.target.value)}
        />
        <input type="submit" aria-label="Add item to list" value="Add new" />
      </form>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => onItemSelect(item)}
            className={item.id === selectedItemId ? "selected" : ""}
          >
            <div>
              <p>{item.id}</p>
              <p>{item.comments.length}</p>
            </div>

            <button onClick={() => onItemDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

export default ItemList;
