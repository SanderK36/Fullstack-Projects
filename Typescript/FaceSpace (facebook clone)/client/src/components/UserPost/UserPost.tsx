import styles from "./UserPost.module.css";
import type { PostProps } from "../Post/Post";

type UserPostProps = {
  author: PostProps["author"];
};

function UserPost({ author }: UserPostProps) {
  return (
    <article className={styles.postContainer}>
      <div className={styles.avatar}>{author.charAt(0)}</div>
      <input
        type="search"
        placeholder={`What's on your mind, ${author}?`}
        aria-label={`What's on your mind, ${author}?`}
        className={styles.search}
      />
    </article>
  );
}
export default UserPost;
