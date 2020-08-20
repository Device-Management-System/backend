exports.seed = async function (knex) {
  return knex('requests').insert([
    {
      device_id: 1,
      user_id: '40e6215d-b5c6-4896-987c-f30f3678f608',
      organization_id: 1,
      note: 'For Testing',
    },
    {
      device_id: 2,
      user_id: '6ecd8c99-4036-403d-bf84-cf8400f67876',
      organization_id: 1,
      note: 'For Development',
    },
    {
      device_id: 3,
      user_id: '3f333df6-90a4-4fda-8dd3-9485d27cee96',
      organization_id: 1,
      note: 'For Testing',
    },
  ]);
};
