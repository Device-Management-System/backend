const db = require('../../data/dbConfig');

const findAll = async () => {
  const allUsers = await db('users');
  return allUsers;
};

const findByID = async (id) => {
  const user = await db('users').where({ id }).first();
  return user;
};

const findByEmail = async (email) => {
  const user = await db('users').where({ email }).first();
  return user;
};

const add = async (newUser) => {
  const [id] = await db('users').insert(newUser, 'id');
  if (id) {
    const user = await findByID(id);
    return user;
  }
};

const update = async (id, infoToUpdate) => {
  const user = await db('users').where('id', id).update(infoToUpdate);
  return await findByID(id);
};

const remove = async (id) => {
  const userToDelete = await findByID(id);
  if (userToDelete) {
    const numOfDeletedRecords = await db('users').where({ id }).del();
    if (numOfDeletedRecords) {
      return userToDelete;
    }
  }
};

module.exports = {
  findAll,
  findByID,
  findByEmail,
  add,
  update,
  remove,
};
