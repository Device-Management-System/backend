const db = require('../../data/dbConfig');

const findUserByID = async (id) => {
  const user = await db('users').where({ id }).first();
  return user;
};

const findUserByEmail = async (userEmail) => {
  const user = await db('users').where({ email: userEmail }).first();
  return user;
};

const addUser = async (newUser) => {
  const [id] = await db('users').insert(newUser, 'id');
  if (id) {
    const user = await findUserByID(id);
    return user;
  }
};

module.exports = {
  findUserByID,
  findUserByEmail,
  addUser,
};
