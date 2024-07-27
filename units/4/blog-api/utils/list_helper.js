const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => blogs.reduce((sum, { likes }) => sum + likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  let mostLiked = blogs[0];

  for (const blog of blogs) {
    if (blog.likes > mostLiked.likes) mostLiked = blog;
  }

  return mostLiked;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = {};
  for (const blog of blogs) {
    authors[blog.author] = (authors[blog.author] ?? 0) + 1;
  }

  let mostBlogs = Object.entries(authors)[0];

  for (const [author, count] of Object.entries(authors)) {
    if (count > mostBlogs[1]) mostBlogs = [author, count];
  }

  return {
    author: mostBlogs[0],
    blogs: mostBlogs[1],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  const authors = {};
  for (const blog of blogs) {
    authors[blog.author] = (authors[blog.author] ?? 0) + blog.likes;
  }

  let mostLikes = Object.entries(authors)[0];

  for (const [author, likes] of Object.entries(authors)) {
    if (likes > mostLikes[1]) mostLikes = [author, likes];
  }

  return {
    author: mostLikes[0],
    likes: mostLikes[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
