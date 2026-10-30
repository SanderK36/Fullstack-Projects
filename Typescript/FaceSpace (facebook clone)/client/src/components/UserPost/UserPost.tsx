import styles from "./UserPost.module.css";
import { useState } from "react";
import type { PostProps } from "../Post/Post";
import type { SubmitEvent } from "react";

const maxPostLength = 280;

type UserPostProps = {
  author: PostProps["author"];
  onAddPost: (content: string) => void;
};

function UserPost({ author, onAddPost }: UserPostProps) {
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (content.trim() === "") {
      return;
    }

    onAddPost(content.trim());
    setContent("");
    setIsPublished(true);
  }
  return (
    <form className={styles.postContainer} onSubmit={handleSubmit}>
      <div className={styles.avatar}>{author.charAt(0)}</div>
      <div className={styles.inputArea}>
        <textarea
          placeholder={`What's on your mind, ${author}?`}
          aria-label={`What's on your mind, ${author}?`}
          className={styles.textarea}
          value={content}
          maxLength={maxPostLength}
          onChange={(e) => {
            setContent(e.target.value);
            setIsPublished(false);
          }}
        />
        <p
          className={`${styles.characterCount} ${
            content.length === maxPostLength
              ? styles.atLimit
              : content.length >= maxPostLength - 30
                ? styles.nearLimit
                : ""
          }`}
        >
          {maxPostLength - content.length} characters remaining
        </p>
      </div>
      <button
        className={styles.postButton}
        type="submit"
        disabled={content.trim() === ""}
      >
        {isPublished
          ? "Published!"
          : content.trim() === ""
            ? "What's on your mind?"
            : "Post"}
      </button>
    </form>
  );
}
export default UserPost;
