exports.seed = async function (knex) {
  return knex('requests').insert([
    {
      device_id: 1,
      user_id: 1,
      organization_id: 1,
      note: 'For Testing',
    },
    {
      device_id: 2,
      user_id: 2,
      organization_id: 1,
      note: 'For Development',
    },
    {
      device_id: 3,
      user_id: 2,
      organization_id: 1,
      note: 'For Testing',
    },
  ]);
};
