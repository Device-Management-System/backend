const db = require('../../data/dbConfig');

module.exports = {
  findAll,
  findById,
  findByEmail,
  add,
  update,
  remove,
};

async function findAll() {
  const allUsers = await db('users');
  return allUsers;
}

async function findById(id) {
  const user = await db('users').where({ id }).first();
  return user;
}

async function findByEmail(email) {
  const user = await db('users').where({ email }).first();
  return user;
}

async function add(newUser) {
  const [id] = await db('users').insert(newUser, 'id');
  if (id) {
    const user = await findById(id);
    return user;
  }
}

async function update(infoToUpdate, id) {
  const editedUser = await db('users').where({ id }).update(infoToUpdate);
  if (editedUser) {
    const updatedUser = await findById(id);
    return updatedUser;
  }
}

async function remove(id) {
  const userToDelete = await findById(id);
  if (userToDelete) {
    const numOfDeletedRecords = await db('users').where({ id }).del();
    if (numOfDeletedRecords) {
      return userToDelete;
    }
  }
}
