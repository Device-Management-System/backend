const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const usersRouter = require('../routes/users/users-routes');
const devicesRouter = require('../routes/devices/devices-route.js');
const requestsRouter = require('../routes/requests/requests-route.js');
const organizationRouter = require('../routes/organization/organization-routes');
const authRouter = require('../routes/auth/auth-route.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'server is working' });
});

server.use('/api/users', usersRouter);
server.use('/api/devices', devicesRouter);
server.use('/api/requests', requestsRouter);
server.use('/api/organization', organizationRouter);
server.use('/api/auth', authRouter);

module.exports = server;
