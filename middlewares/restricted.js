const jwt_decode = require('jwt-decode');

// module.exports = (req, res, next) => {
// To-do: Refactor for Auth0
// const idToken = req.headers.authorization;
// if (idToken) {
//   firebase
//     .auth()
//     .verifyIdToken(idToken)
//     .then(function (decodedToken) {
//       req.headers.decodedToken = decodedToken;
//       next();
//     })
//     .catch(function (error) {
//       console.log('Token is not valid');
//       res.status(401).json({ message: 'Invalid Token' });
//     });
// } else {
//   res.status(500).json({ message: 'Token validation failed' });
// }
// };

const tokenVerification = async (req, res, next) => {
  try {
    const token = await jwt_decode(req.headers.authorization);
    console.log('Token', token);
    // Todo: check the token first
    // const { sub } = token;
    req.headers.decodedToken = token;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid Token' });
    throw error;
  }
};

module.exports = {
  tokenVerification,
};
