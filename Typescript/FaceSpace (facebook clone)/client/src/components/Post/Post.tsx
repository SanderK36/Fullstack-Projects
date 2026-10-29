import styles from "./Post.module.css";
import { useState } from "react";

export type PostProps = {
  author: string;
  content: string;
  likes: number;
  posted: string;
};

function Post({ author, content, likes, posted }: PostProps) {
  const [like, setLike] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    if (isLiked) {
      setLike((prev) => prev - 1);
    } else {
      setLike((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);
  }
  return (
    <article className={styles.postContainer}>
      <div className={styles.postHeader}>
        <div className={styles.avatar}>{author.charAt(0)}</div>

        <div className={styles.authorInfo}>
          <h3 className={styles.author}>{author}</h3>
          <span className={styles.posted}>{posted}</span>
        </div>
      </div>

      <p className={styles.content}>{content}</p>

      <div className={styles.postStats}>
        <span>{like} likes</span>
      </div>

      <div className={styles.postActions}>
        <button
          className={styles.actionButton}
          onClick={handleLike}
          aria-pressed={isLiked}
        >
          <i
            className={
              isLiked ? "bi bi-hand-thumbs-up-fill" : "bi bi-hand-thumbs-up"
            }
            aria-hidden="true"
          ></i>
          <span>{isLiked ? " Liked" : " Like"}</span>
        </button>

        <button className={styles.actionButton}>
          <i className="bi bi-chat"></i>
          <span> Comment</span>
        </button>

        <button className={styles.actionButton}>
          <i className="bi bi-share"></i>
          <span> Share</span>
        </button>
      </div>
    </article>
  );
}

export default Post;
