let jwt = require('express-jwt');
let jwks = require('jwks-rsa');

module.exports = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH_0_URI,
  }),
  audience: process.env.AUTH_0_AUDIENCE,
  issuer: process.env.AUTH_0_ISSUER,
  algorithms: [process.env.AUTH_0_ALGO],
});
