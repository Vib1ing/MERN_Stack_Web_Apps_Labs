const logger = require("./logger");
const jwt = require('jsonwebtoken');

const requestLogger = (req, res, next) => {
  logger.log(`Request Method: ${req.method}`);
  logger.log(`Request URL: ${req.url}`);
  const modifiedBody = req.body.password ? { ...req.body, password: "******" } : req.body
  logger.log("Request body:", modifiedBody);
  logger.log("------------");
  next();
};

// middleware for error handling
const errorHandler = (error, req, res, next) => {
  logger.error("error message: ", error.message);
  if (error.name === "CastError") {
    return res.status(400).json({ error: "invalid id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError") {
    return res.status(400).json({ error: error.message })
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "NO JWT = NO ENTRY" })
  }
  next(error);
};

const tokenPayloadExtractor = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
      req.token=authHeader.slice(7);
  } else {
      req.token = null;
  }
  next();
};

const userIdentifier = (req, res, next) => {
  if (!req.token) {
      return res.status(401).json({ error: 'Token missing' });
  }

  try {
      const decodedToken = jwt.verify(req.token, process.env.JWT_SECRET);
      req.user = decodedToken; 
      next();
  } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { requestLogger, errorHandler, tokenPayloadExtractor, userIdentifier };
