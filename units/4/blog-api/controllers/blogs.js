const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const token = request.header("Authorization");

  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7);
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findOne({ _id: decodedToken.id });

  const blog = new Blog({ ...request.body, user });

  try {
    const result = await blog.save({ new: true, runValidators: true });

    user.blogs = user.blogs.concat(result._id);

    await user.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  const { likes } = request.body;
  try {
    const result = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true, context: "query" });
    response.json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
