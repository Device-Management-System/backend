const jwt_decode = require('jwt-decode');

const tokenVerification = async (req, res, next) => {
  try {
    console.log(req.body);
    const token = await jwt_decode(req.headers.authorization);
    req.headers.decodedToken = token;
    req.userID = token.sub.slice(6);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
    throw error;
  }
};

module.exports = {
  tokenVerification,
};
