import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Post from "./components/Post/Post";

type PostData = {
  id: number;
  author: string;
  content: string;
  likes: number;
  posted: string;
};

const posts: PostData[] = [
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
    posted: "Today",
  },
];

function App() {
  return (
    <div>
      <Navbar />

      <h1>FaceSpace</h1>
      <p>Welcome to FaceSpace!</p>

      {posts.map((post) => (
        <Post
          key={post.id}
          author={post.author}
          content={post.content}
          likes={post.likes}
          posted={post.posted}
        />
      ))}
    </div>
  );
}

export default App;
