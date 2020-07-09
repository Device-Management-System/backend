const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const devicesRouter = require('../routes/devices/devices-route.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan('dev'));

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'server is working' });
});

server.use('/api/devices', devicesRouter);

module.exports = server;
