exports.seed = async function (knex) {
  return knex('devices').insert([
    {
      device_model: 'RS988',
      serial_number: 'X01X23Y4XYXY',
      os: 'Android',
      brand: 'Samsung',
      user_id: '40e6215d-b5c6-4896-987c-f30f3678f608',
    },
    {
      device_model: 'AC246',
      serial_number: 'TX01X23Y4XY7A',
      os: 'iOS',
      brand: 'Apple',
      user_id: '6ecd8c99-4036-403d-bf84-cf8400f67876',
    },
    {
      device_model: 'TA712',
      serial_number: 'AX01X23Y4XAB7',
      os: 'iOS',
      brand: 'Apple',
      user_id: '3f333df6-90a4-4fda-8dd3-9485d27cee96',
    },
  ]);
};
