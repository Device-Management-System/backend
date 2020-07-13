const db = require('../../data/dbConfig');

const findUserByEmail = async (userEmail) => {
  const user = await db('users').where({ email: userEmail });
  return user;
};

const addUser = async (userInfo) => {
  const newUser = await db('users').insert(userInfo);
  return newUser;
};

module.exports = {
  findUserByEmail,
  addUser,
};
