const db = require('../../data/dbConfig.js');

const findAll = async () => {
  const devices = await db('devices');
  return devices;
};

const findById = async (id) => {
  const device = await db('devices').where({ id }).first();
  return device;
};

const findALLByUserID = async (userID) => {
  const userDevices = await db('devices').where({ 'devices.user_id': userID });
  return userDevices;
};

const findByIdAndUserID = async (userID, taskID) => {
  const userDevice = await db('devices')
    .where({ 'devices.user_id': userID })
    .andWhere({ 'devices.id': taskID });
  return userDevice;
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
  findALLByUserID,
  findByIdAndUserID,
  add,
  update,
  remove,
};
