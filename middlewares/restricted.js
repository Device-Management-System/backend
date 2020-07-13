const firebase = require('../helpers/firebase');

module.exports = (req, res, next) => {
  console.log(req.body);
  const idToken = req.body.token;
  if (idToken) {
    firebase
      .auth()
      .verifyIdToken(idToken)
      .then(function (decodedToken) {
        req.headers.decodedToken = decodedToken;
        next();
      })
      .catch(function (error) {
        console.log('Token is not valid');
        res.status(401).json({ message: 'invalid Token' });
      });
  } else {
    res.status(500).json({ message: 'Token validation failed' });
  }
};
