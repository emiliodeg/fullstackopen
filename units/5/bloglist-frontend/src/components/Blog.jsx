import { useState } from "react";

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="bordered">
      {blog.title} <em>{blog.author}</em> <button onClick={() => setVisible(!visible)}>{visible ? "hide" : "view"}</button>
      {visible && (
        <div>
          <a href={blog.url} target="_blank" rel="noreferrer noopenner">
            {blog.url}
          </a>
          <br />
          likes {blog.likes} <button>like</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
