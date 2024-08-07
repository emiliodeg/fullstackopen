const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username: providedUsername, password } = request.body;

  const user = await User.findOne({ username: providedUsername });
  const passwordCorrect = user == null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!user || !passwordCorrect) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const { _id: id, name, username } = user;

  const userForToken = {
    username,
    id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({ token, username, name });
});

module.exports = loginRouter;
