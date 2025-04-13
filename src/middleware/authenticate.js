const env = process.env.NODE_ENV;

const isAuthenticated = (req, res, next) => {
  if (env === 'development' || env === 'test') {
    return next();
  }

  if (req.user === undefined) {
    return res.status(401).json('You do not have access');
  }
  next();
};

module.exports = {
  isAuthenticated,
};
