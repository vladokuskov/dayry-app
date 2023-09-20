import SelectedItem from "../SelectedItem";
import SectionContainer from "../SectionContainer/SectionContainer";
import { Item } from "../../types/item.types";
import { Comment } from "../../types/comment.types";
import { FormEvent, useState } from "react";
import styles from "./CommentsList.module.css";

type ICommentsList = {
  selectedItem: Item | null;
  onCommentAdd: (comment: Comment, itemId: string) => void;
};

function CommentsList({ selectedItem, onCommentAdd }: ICommentsList) {
  const title = selectedItem ? `Comments #${selectedItem.id}` : "Comments";
  const [commentName, setCommentName] = useState<string>("");
  const [commentColor, setCommentColor] = useState<string>("#882222");

  const handleCommentAdd = (e: FormEvent) => {
    e.preventDefault();

    const newComment = {
      id: Date.now().toString(),
      name: commentName,
      color: commentColor,
    };

    if (setCommentName.length && selectedItem) {
      onCommentAdd(newComment, selectedItem.id);

      setCommentName("");
    }
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentColor(e.target.value);
  };

  return (
    <SectionContainer title={title}>
      <SelectedItem />

      <ul className={styles["list"]}>
        {selectedItem &&
          selectedItem.comments.map((item) => (
            <li key={item.id} className={styles["list-item"]}>
              <div
                style={{ backgroundColor: item.color }}
                className={styles["list-color"]}
              >
                {" "}
              </div>
              <p className={styles["list-content"]}>{item.name}</p>
            </li>
          ))}
      </ul>

      <form onSubmit={handleCommentAdd} className={styles["form"]}>
        <input
          type="color"
          aria-label="Select comment color"
          className={styles["input-color"]}
          onChange={handleColorChange}
          value={commentColor}
        />
        <textarea
          placeholder="Type comment here ..."
          aria-label="Enter comment name"
          required
          value={commentName}
          onChange={(e) => setCommentName(e.target.value)}
          className={styles["textarea"]}
          rows={10}
          cols={40}
        />
        <input
          type="submit"
          aria-label="Add comment to item"
          value="Add new"
          className={styles["add-button"]}
        />
      </form>
    </SectionContainer>
  );
}

export default CommentsList;
