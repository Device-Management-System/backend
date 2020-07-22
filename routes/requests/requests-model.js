const db = require('../../data/dbConfig.js');

const findAll = async () => {
  return await db('requests');
};

const findById = async (id) => {
  return await db('requests').where({ id }).first();
};

const findAllByUserId = async (id) => {
  const allUserRequests = await db('requests').where({ user_id: id });
  return allUserRequests;
};

const add = async (data) => {
  const [id] = await db('requests').insert(data, 'id');
  return findById(id);
};

const update = async (id, update) => {
  const request = await db('requests').where('id', id).update(update);
  return findById(id);
};

const remove = async (id) => {
  return await db('requests').where('id', id).del();
};

module.exports = {
  findAll,
  findById,
  findAllByUserId,
  add,
  update,
  remove,
};
