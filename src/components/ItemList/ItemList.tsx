import { FormEvent, useState } from "react";
import { Item } from "../../types/item.types";
import SectionContainer from "../SectionContainer/SectionContainer";
import styles from "./ItemList.module.css";

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
      <form onSubmit={handleAddItem} className={styles["form"]}>
        <input
          type="text"
          placeholder="Type name here ..."
          aria-label="Enter item name"
          className={styles.input}
          value={itemName}
          required
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="submit"
          aria-label="Add item to list"
          value="Add new"
          className={styles["add-button"]}
        />
      </form>

      <ul className={styles["list"]}>
        {items.map((item) => (
          <li
            key={item.id}
            className={`${styles["list-item"]} ${
              item.id === selectedItemId && styles["selected"]
            }`}
          >
            <div
              onClick={() => onItemSelect(item)}
              className={styles["list-item-content"]}
            >
              <span>{item.name}</span>
              <span className={styles["comments"]}>{item.comments.length}</span>
            </div>
            <button
              onClick={() => onItemDelete(item.id)}
              className={styles["delete-button"]}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}

export default ItemList;
