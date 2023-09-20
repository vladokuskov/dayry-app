import CommentsList from "./components/CommentsList/CommentsList";
import ItemList from "./components/ItemList/ItemList";
import "./App.css";
import { Item } from "./types/item.types";
import { Comment } from "./types/comment.types";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [items, setItems] = useLocalStorage<Item[]>("items", []);
  const [selectedItem, setSelectedItem] = useLocalStorage<Item | null>(
    "selectedItem",
    null
  );

  const onSelectItem = (item: Item) => {
    const newSelectedItem = selectedItem?.id !== item.id ? item : null;
    setSelectedItem(newSelectedItem);
  };

  const onItemAdd = (newItem: Item) => {
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    setSelectedItem(newItem);
  };

  const onItemDelete = (itemId: string) => {
    const newItems = items.filter((item) => item.id !== itemId);

    setItems(newItems);
    if (selectedItem && itemId === selectedItem.id) {
      setSelectedItem(null);
    }
  };

  const onCommentAdd = (comment: Comment, itemId: string) => {
    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const updatedItems = [...items];

      updatedItems[itemIndex] = {
        ...updatedItems[itemIndex],
        comments: [...updatedItems[itemIndex].comments, comment],
      };

      setItems(updatedItems);
      setSelectedItem(updatedItems[itemIndex]);
    }
  };
  return (
    <main className="main-wrapper">
      <header className="info-header">
        <h1>DAYRY APP</h1>
        <p>Comments with no sense</p>
      </header>
      <div className="sections-wrapper">
        <ItemList
          items={items}
          onItemAdd={onItemAdd}
          onItemSelect={onSelectItem}
          onItemDelete={onItemDelete}
          selectedItemId={selectedItem?.id}
        />
        <CommentsList selectedItem={selectedItem} onCommentAdd={onCommentAdd} />
      </div>
    </main>
  );
}

export default App;
