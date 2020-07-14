exports.seed = async function (knex) {
  return knex('devices').insert([
    {
      device_model: 'RS988',
      serial_number: 'X01X23Y4XYXY',
      os: 'Android',
      brand: 'Samsung',
      user_id: 4,
      assign_to_user_id: 1,
    },
    {
      device_model: 'AC246',
      serial_number: 'TX01X23Y4XY7A',
      os: 'iOS',
      brand: 'Apple',
      user_id: 4,
      assign_to_user_id: 2,
    },
    {
      device_model: 'TA712',
      serial_number: 'AX01X23Y4XAB7',
      os: 'iOS',
      brand: 'Apple',
      user_id: 4,
      assign_to_user_id: 3,
    },
  ]);
};
