const request = require('request');

module.exports = (req, res, next) => {
  const options = {
    method: 'POST',
    url: `${process.env.AUTH_0_ISSUER}oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type: process.env.AUTH_0_GRANT_TYPE,
      client_id: process.env.AUTH_0_CLIENT_ID,
      client_secret: process.env.AUTH_0_CLIENT_SECRET,
      audience: process.env.AUTH_0_AUDIENCE_API,
    },
  };

  request(options, (error, response, body) => {
    if (error) throw new Error(error);

    apiToken = JSON.parse(body);
    if (apiToken && apiToken.access_token) {
      req.apiToken = apiToken.access_token;
      next();
    }
  });
};
