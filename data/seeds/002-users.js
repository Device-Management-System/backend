exports.seed = async function (knex) {
  return knex('users').insert([
    {
      id: '40e6215d-b5c6-4896-987c-f30f3678f608',
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      role: 'software engineer',
      is_employed: true,
      organization_id: 1,
      is_completed: true,
    },
    {
      id: '6ecd8c99-4036-403d-bf84-cf8400f67876',
      name: 'Alex Green',
      email: 'alex.green@gmail.com',
      role: 'senior software engineer',
      is_employed: true,
      organization_id: 1,
      is_completed: true,
    },
    {
      id: '3f333df6-90a4-4fda-8dd3-9485d27cee96',
      name: 'Ocean Andrews',
      email: 'ocean.andrews@gmail.com',
      role: 'qa engineer',
      is_employed: true,
      organization_id: 1,
      is_completed: true,
    },
    {
      id: '3f333df6-90a4-4fda-8dd3-9485d27cee16',
      name: 'Loren Leigh',
      email: 'loren.leigh@gmail.com',
      role: 'IT engineer',
      is_employed: true,
      is_admin: true,
      organization_id: 1,
      is_completed: true,
    },
  ]);
};
