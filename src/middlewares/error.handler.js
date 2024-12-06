const errorHandler = (err, _req, res, _next) => {
  console.error(err.message);
  return res.status(500).json({ message: 'Internal Server Error!' });
};

module.exports = errorHandler;
