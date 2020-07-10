const firebase = require('../helpers/firebase');

module.exports = (req, res, next) => {
  const idToken = req.body.token;
  if (idToken) {
    firebase
      .auth()
      .verifyIdToken(idToken)
      .then(function (decodedToken) {
        req.body.decodedToken = decodedToken;
        next();
      })
      .catch(function (error) {
        console.error('Token is not valid', error);
        res.status(401).json({ message: 'invalid Token', error });
      });
  } else {
    res.status(500).json({ message: 'Token validation failed', error });
  }
};
