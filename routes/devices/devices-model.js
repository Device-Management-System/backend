const db = require('../../data/dbConfig.js');

const findAll = async () => {
  const devices = await db('devices');
  return devices;
};

const findById = async (id) => {
  const device = await db('devices').where({ id }).first();
  return device;
};

const add = async (data) => {
  const [id] = await db('devices').insert(data, 'id');
  return findById(id);
};

const update = async (id, update) => {
  const device = await db('devices').where('id', id).update(update);
  return findById(id);
};

const remove = async (id) => {
  return await db('devices').where('id', id).del();
};

module.exports = {
  findAll,
  findById,
  add,
  update,
  remove,
};
