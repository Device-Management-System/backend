const db = require('../../data/dbConfig');

const findAll = async () => {
  const allUsers = await db('users');
  return allUsers;
};

const findById = async (id) => {
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
    const user = await findById(id);
    return user;
  }
};

const update = async (id, infoToUpdate) => {
  const editedUser = await db('users').where({ id }).update(infoToUpdate);
  if (editedUser) {
    const updatedUser = await findById(id);
    return updatedUser;
  }
};

const remove = async (id) => {
  const userToDelete = await findById(id);
  if (userToDelete) {
    const numOfDeletedRecords = await db('users').where({ id }).del();
    if (numOfDeletedRecords) {
      return userToDelete;
    }
  }
};

module.exports = {
  findAll,
  findById,
  findByEmail,
  add,
  update,
  remove,
};
