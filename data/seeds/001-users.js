exports.seed = async function (knex) {
  return knex('users').insert([
    {
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      uuid: '40e6215d-b5c6-4896-987c-f30f3678f608',
      role: 'software engineer',
      is_employed: true,
    },
    {
      name: 'Alex Green',
      email: 'alex.green@gmail.com',
      uuid: '6ecd8c99-4036-403d-bf84-cf8400f67876',
      role: 'senior software engineer',
      is_employed: true,
    },
    {
      name: 'Ocean Andrews',
      email: 'ocean.andrews@gmail.com',
      uuid: '3f333df6-90a4-4fda-8dd3-9485d27cee96',
      role: 'qa engineer',
      is_employed: true,
    },
    {
      name: 'Loren Leigh',
      email: 'loren.leigh@gmail.com',
      uuid: '3f333df6-90a4-4fda-8dd3-9485d27cee16',
      role: 'IT engineer',
      is_employed: true,
      is_admin: true,
    },
  ]);
};
