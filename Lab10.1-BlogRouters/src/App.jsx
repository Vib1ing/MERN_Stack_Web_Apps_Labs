import About from "./views/About";
import BlogList from "./views/BlogList";
import Login from "./views/Login";
import UserList from "./views/UserList";
import UserDetails from "./views/UserDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BlogDetails from "./views/BlogDetails";
import Header from "./components/Header";
import { useState } from "react";
const App = () => {
  const blogs = [
    {
      id: 1,
      title: "The Art of Coding",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      author: "John Doe",
      likes: 25,
    },
    {
      id: 2,
      title: "Exploring React Hooks",
      content: "React Hooks provide a new way to manage state and effects...",
      author: "Jane Smith",
      likes: 18,
    },
    {
      id: 3,
      title: "Tips for Web Development Beginners",
      content: "Starting a career in web development? Here are some useful tips...",
      author: "Alice Johnson",
      likes: 32,
    },
    {
      id: 4,
      title: "The Beauty of JavaScript",
      content: "JavaScript is a versatile language used for web development...",
      author: "Bob Brown",
      likes: 12,
    },
  ]; 
  const users = [
    {
      id: 1,
      name: "John Doe",
      username: "johndoe123",
      numberOfBlogs: 7,
    },
    {
      id: 2,
      name: "Jane Smith",
      username: "janesmith456",
      numberOfBlogs: 12,
    },
    {
      id: 3,
      name: "Alice Johnson",
      username: "alicej",
      numberOfBlogs: 5,
    },
    {
      id: 4,
      name: "Bob Brown",
      username: "bobbrown",
      numberOfBlogs: 9,
    },
    {
      id: 5,
      name: "Ella Davis",
      username: "ellad",
      numberOfBlogs: 15,
    },
  ];
  const [loggedIn, SETisLoggedIn] = useState(false);
  return (
    
    <Router>
      <Header loggedIn={loggedIn} SETisLoggedIn={SETisLoggedIn}/>
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <BlogList blogs={blogs} />
            ) : (
              <Login SETisLoggedIn={SETisLoggedIn} />
            )
          }
        />
        <Route path="/users" element={<UserList users={users} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login SETisLoggedIn={SETisLoggedIn}/>} />
        <Route path="/users/:id" element={<UserDetails users={users} />} />
        <Route path="/blogs/:id" element={<BlogDetails blogs={blogs} />} />
      </Routes>
    </Router>
  )
}

export default App