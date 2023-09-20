import SelectedItem from "./SelectedItem";
import SectionContainer from "./SectionContainer/SectionContainer";
import { Item } from "../types/item.types";
import { Comment } from "../types/comment.types";
import { FormEvent, useState } from "react";

type ICommentsList = {
  selectedItem: Item | null;
  onCommentAdd: (comment: Comment, itemId: string) => void;
};

function CommentsList({ selectedItem, onCommentAdd }: ICommentsList) {
  const title = selectedItem ? `Comments #${selectedItem.id}` : "Comments";
  const [commentName, setCommentName] = useState<string>("");
  const [commentColor, setCommentColor] = useState<string>("#FFFFFF");

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

  return (
    <SectionContainer title={title}>
      <SelectedItem />

      <ul>
        {selectedItem &&
          selectedItem.comments.map((item) => (
            <li key={item.id}>
              <div>
                <p>{item.color}</p>
                <p>{item.name}</p>
              </div>
            </li>
          ))}
      </ul>

      <form onSubmit={handleCommentAdd}>
        <textarea
          placeholder="Type comment here ..."
          aria-label="Enter comment name"
          required
          value={commentName}
          onChange={(e) => setCommentName(e.target.value)}
        />
        <input type="submit" aria-label="Add comment to item" value="Add new" />
      </form>
    </SectionContainer>
  );
}

export default CommentsList;
