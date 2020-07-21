const db = require('../../data/dbConfig.js');

const findById = async (id) => {
  const organization = await db('organization').where({ id }).first();
  return organization;
};

const add = async (newOrg) => {
  const [id] = await db('organization').insert(newOrg, 'id');
  if (id) {
    const organization = await findById(id);
    return organization;
  }
};

const update = async (id, update) => {
  const editedOrg = await db('requests').where({ id }).update(update);
  if (editedOrg) {
    const updatedOrg = await findById(id);
    return updatedOrg;
  }
};

const remove = async (id) => {
  const orgToDelete = await findById(id);
  if (orgToDelete) {
    const numOfDeletedOrg = await db('requests').where({ id }).del();
    if (numOfDeletedOrg) {
      return orgToDelete;
    }
  }
};

module.exports = {
  findById,
  add,
  update,
  remove,
};
