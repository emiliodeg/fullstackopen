const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const { username, name, password } = request.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = new User({ username, name, passwordHash });

  try {
    const result = await user.save({ new: true, runValidators: true });

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
