const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1 });

  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;

  if (password == null) {
    return next({
      name: "ValidationError",
      message: "password is required",
    });
  }

  if (password.length < 3) {
    return next({
      name: "ValidationError",
      message: "password must be at least 3 characters long",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({ username, name, passwordHash, blogs: [] });

  try {
    const result = await user.save({ new: true, runValidators: true });

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
