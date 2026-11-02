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
  const [searchQuery, setSearchQuery] = useState("");
  const currentUser = "Sander";

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredPosts = posts.filter((post) =>
    post.content.toLowerCase().includes(normalizedQuery),
  );

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

  function deletePost(id: number) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  }

  return (
    <div>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <p>
        {posts.length === 0 ? "No posts yet" : `Total posts: ${posts.length}`}
      </p>
      <main className="feed">
        <UserPost author={currentUser} onAddPost={addPost} />

        {posts.length === 0 && (
          <p className="noPosts">
            Could'nt find any posts. Try refreshing the page.
          </p>
        )}

        {filteredPosts.map((post) => (
          <Post
            key={post.id}
            author={post.author}
            content={post.content}
            likes={post.likes}
            posted={post.posted}
            onDelete={() => deletePost(post.id)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
