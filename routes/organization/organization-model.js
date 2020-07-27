const db = require('../../data/dbConfig.js');

const findById = async (id) => {
  const organization = await db('organization').where({ id }).first();
  return organization;
};

const findByName = async (name) => {
  const organization = await db('organization').where({ name }).first();
  return organization;
};

const findAllOrgUsers = async (id) => {
  const organizationUsers = await db('users')
    .select({
      id: 'id',
      name: 'name',
      email: 'email',
      role: 'role',
      is_employed: 'is_employed',
      is_admin: 'is_admin',
      organization_id: 'organization_id',
    })
    .where({ organization_id: id });
  return organizationUsers;
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
  findByName,
  findAllOrgUsers,
  add,
  update,
  remove,
};
