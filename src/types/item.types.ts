import { Comment } from "./comment.types";

export type Item = {
  id: string;
  name: string;
  comments: Comment[];
};
