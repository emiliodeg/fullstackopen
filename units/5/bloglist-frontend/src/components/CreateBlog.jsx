export default function CreateBlog({ handleSubmit, title, setTitle, author, setAuthor, url, setUrl }) {
  return (
    <>
      <h2>Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title: <input name="title" value={title} onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label>
            Author: <input name="author" value={author} onChange={({ target }) => setAuthor(target.value)} />
          </label>
        </div>
        <div>
          <label>
            URL: <input type="url" name="url" value={url} onChange={({ target }) => setUrl(target.value)} />
          </label>
        </div>
        <button>create</button>
      </form>
    </>
  );
}
