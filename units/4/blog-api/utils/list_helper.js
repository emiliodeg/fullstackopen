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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
