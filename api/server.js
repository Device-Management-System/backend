const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const jwtCheck = require('../middlewares/auth0');
const getAPIAccessToken = require('../middlewares/getApiAccessToken');
const usersRouter = require('../routes/users/users-routes');
const devicesRouter = require('../routes/devices/devices-route.js');
const requestsRouter = require('../routes/requests/requests-route.js');
const organizationRouter = require('../routes/organization/organization-route');
const authRouter = require('../routes/auth/auth-route.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'server is working' });
});

server.use('/api/auth', jwtCheck, authRouter);
server.use(getAPIAccessToken);
server.use('/api/users', jwtCheck, usersRouter);
server.use('/api/devices', jwtCheck, devicesRouter);
server.use('/api/requests', jwtCheck, requestsRouter);
server.use('/api/organization', jwtCheck, organizationRouter);

module.exports = server;
