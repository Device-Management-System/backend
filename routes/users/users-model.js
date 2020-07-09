const db = require('../../data/dbConfig');

module.exports = {
  findAll,
};

async function findAll() {
  const allUsers = await db('users');
  return allUsers;
}
