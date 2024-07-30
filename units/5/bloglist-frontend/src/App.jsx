import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import LoggedIn from "./components/LoggedIn";
import Notification from "./components/Notification";
import CreateBlog from "./components/CreateBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      setNotification({ type: "error", message: "Wrong credentials" });
      setTimeout(() => setNotification(null), 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedUser");
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const blog = {
      title,
      author,
      url,
    };

    try {
      const newBlog = await blogService.create(blog);
      setBlogs(blogs.concat(newBlog));
      setNotification({ type: "success", message: `New blog added: ${newBlog.title}` });
    } catch (exception) {
      setNotification({ type: "error", message: "Could NOT create a new blog" });
    } finally {
      setTitle("");
      setAuthor("");
      setUrl("");
      setTimeout(() => setNotification(null), 5000);
    }
  };

  useEffect(() => {
    const session = window.localStorage.getItem("loggedUser");
    if (!session) return;

    const user = JSON.parse(session);
    setUser(user);
    blogService.setToken(user.token);
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      {user === null ? (
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
      ) : (
        <LoggedIn user={user} handleLogout={handleLogout} />
      )}

      {user !== null && (
        <CreateBlog
          handleSubmit={handleCreateBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      )}
      {user !== null && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
    </div>
  );
};

export default App;
