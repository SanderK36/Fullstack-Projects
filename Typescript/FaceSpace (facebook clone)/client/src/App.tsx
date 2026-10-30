import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Post from "./components/Post/Post";
import UserPost from "./components/UserPost/UserPost";
import { useState } from "react";

type PostData = {
  id: number;
  author: string;
  content: string;
  likes: number;
  posted: string;
};

const initialPosts: PostData[] = [
  {
    id: 1,
    author: "Sander Karlsen",
    content: "Hello world!",
    likes: 45,
    posted: "Today",
  },
  {
    id: 2,
    author: "Ola Nordmann",
    content: "Jeg lærer React!",
    likes: 10,
    posted: "Yesterday",
  },
  {
    id: 3,
    author: "Kari Hansen",
    content: "TypeScript er kult!",
    likes: 25,
    posted: "5h ago",
  },
  {
    id: 4,
    author: "Per Olsen",
    content: "Jeg elsker programmering!",
    likes: 0,
    posted: "34 min ago",
  },
];

function App() {
  const [posts, setPosts] = useState<PostData[]>(initialPosts);
  const currentUser = "Sander";

  function addPost(content: string) {
    const newPost: PostData = {
      id: Date.now(),
      author: currentUser,
      content: content,
      likes: 0,
      posted: "Just now",
    };
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  }
  return (
    <div>
      <Navbar />
      <main className="feed">
        <UserPost author={currentUser} onAddPost={addPost} />
        {posts.map((post) => (
          <Post
            key={post.id}
            author={post.author}
            content={post.content}
            likes={post.likes}
            posted={post.posted}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
