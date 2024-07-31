import { useState } from "react";

const Blog = ({ blog, onLike }) => {
  const [visible, setVisible] = useState(false);



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
        </div>
      )}
    </div>
  );
};

export default Blog;
