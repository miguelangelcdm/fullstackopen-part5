import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import NotificationBox from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/loginForm";
import "./app.css";
import "./index.css";
import PrimaryRoundedButton from "./components/PrimaryBtn";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setNotification({ message: `Welcome ${user.name}`, type: "success" });
      setTimeout(() => {
        setNotification({ message: null, error: null });
      }, 5000);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotification({ message: "Wrong credentials", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, error: null });
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();
    const blogObject = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url,
    };
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setNotification({ message: `A new blog "${newBlog.title}" by ${newBlog.author} added`, type: "success" });
      setTimeout(() => {
        setNotification({ message: null, error: null });
      }, 5000);
      setNewBlog({ title: "", author: "", url: "" });
    } catch (error) {
      setNotification({ message: `Failed to add blog: ${error}`, type: "error" });
      setTimeout(() => {
        setNotification({ message: null, error: null });
      }, 5000);
    }
  };

  const logout = async () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setNotification({ message: "Logout successful", type: "success" });
    setTimeout(() => {
      setNotification({ message: null, error: null });
    }, 5000);
  };

  return (
    <div className="bg-slate-600 p-4 flex flex-col gap-4">
      <h1 className="text-xl">blogs</h1>
      <NotificationBox message={Notification.message} type={Notification.type}/>
      {user === null ? (
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <div className="flex gap-2 items-center">
            <p>{user.name} logged-in</p>
            <form onSubmit={logout}>
              <PrimaryRoundedButton text={"logout"} />
            </form>
          </div>
          <BlogForm
            newBlog={newBlog}
            addBlog={addBlog}
            setNewBlog={setNewBlog}
          />
        </div>
      )}
      {blogs
        .slice()
        .reverse()
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

export default App;
