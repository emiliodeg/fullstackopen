const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response, next) => {
  const { token } = request;

  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = request.user;

  const blog = new Blog({ ...request.body, user });

  try {
    const result = await blog.save({ validateBeforeSave: true });

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
    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", middleware.userExtractor, async (request, response, next) => {
  const { token } = request;

  if (!token) {
    return response.status(401).json({ error: "token missing" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).end();
  }

  const user = request.user;

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "unauthorized" });
  }

  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
