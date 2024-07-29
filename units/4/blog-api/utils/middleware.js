const logger = require("./logger");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.message.includes("E11000 duplicate key error collection")) {
    return response.status(400).json({ error: "username already exists" });
  }
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");

  if (typeof authorization === "string") {
    request.token = authorization.toLowerCase().startsWith("bearer ") ? authorization.slice(7) : authorization;
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
