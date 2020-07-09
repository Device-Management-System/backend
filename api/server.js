const express = require('express');
const cors = require('cors');

const usersRouter = require('../routes/users/users-routes');

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', async (req, res) => {
  res.status(200).json({ api: 'server is working' });
});

server.use('/api/users', usersRouter);

module.exports = server;
