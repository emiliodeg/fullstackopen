import { useState } from "react";

const Blog = ({ blog, user, onLike, onDelete }) => {
  const [visible, setVisible] = useState(false);

  console.log(user);

  const confirmBeforeDelete = (blog) => {
    if (!window.confirm(`Remove ${blog.title} by ${blog.author}?`)) return;

    onDelete(blog);
  };

  return (
    <div className="bordered">
      <strong>{blog.title}</strong> <em>{blog.author}</em> <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer noopenner">
            {blog.url}
          </a>
          <br />
          likes {blog.likes} <button onClick={() => onLike(blog)}>like</button>
          <br />
          Author: {blog.author}
          {user && user.username === blog?.user?.username && <button onClick={() => confirmBeforeDelete(blog)}>remove</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
