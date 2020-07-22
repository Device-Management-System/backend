module.exports = (role) => {
  return (req, res, next) => {
    req.headers.decodedToken &&
    req.headers.decodedToken.role &&
    req.headers.decodedToken === role
      ? next()
      : res.status(403).json({ message: 'Access denied!' });
  };
};
