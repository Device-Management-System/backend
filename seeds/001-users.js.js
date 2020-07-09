exports.seed = async function (knex) {
  return knex('users').insert([
    {
      first_name: 'John',
      last_name: 'Smith',
      email: 'john.smith@gmail.com',
      uuid: '40e6215d-b5c6-4896-987c-f30f3678f608',
      role: 'software engineer',
      is_employed: true,
    },
    {
      first_name: 'Alex',
      last_name: 'Green',
      email: 'alex.green@gmail.com',
      uuid: '6ecd8c99-4036-403d-bf84-cf8400f67836',
      role: 'senior software engineer',
      is_employed: true,
    },
    {
      first_name: 'Ocean',
      last_name: 'Andrews',
      email: 'ocean.andrews@gmail.com',
      uuid: '3f333df6-90a4-4fda-8dd3-9485d27cee36',
      role: 'qa engineer',
      is_employed: true,
    },
  ]);
};
