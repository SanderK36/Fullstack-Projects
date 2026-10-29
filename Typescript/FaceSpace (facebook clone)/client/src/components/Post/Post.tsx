import styles from "./Post.module.css";
import { useState } from "react";

type PostProps = {
  author: string;
  content: string;
  likes: number;
  posted: string;
};

function Post({ author, content, likes, posted }: PostProps) {
  const [like, setLike] = useState(likes);
  return (
    <div className={styles.postContainer}>
      <div className={styles.postContent}>
        <h3>{author}</h3>
        <p>{posted}</p>
        <p>{content}</p>
        <p>
          Likes: {like}
          <button onClick={() => setLike((prev) => prev + 1)}>Like</button>
        </p>
      </div>
    </div>
  );
}

export default Post;
