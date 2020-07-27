const db = require('../../data/dbConfig');

const findById = async (id) => {
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
    const user = await findById(id);
    return user;
  }
};

module.exports = {
  findUserByEmail,
  addUser,
};
