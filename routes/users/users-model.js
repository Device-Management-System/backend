const db = require('../../data/dbConfig');

module.exports = {
  findAll,
  findUserByEmail,
  addUser,
};

async function findAll() {
  const allUsers = await db('users');
  return allUsers;
}

async function findUserByEmail(userEmail) {
  const user = await db('users').where({ email: userEmail });
  return user;
}

async function addUser(userInfo) {
  const newUser = await db('users').insert(userInfo);
  return newUser;
}
