exports.seed = async function (knex) {
  return knex('organization').insert([
    {
      name: 'Hello World',
    },
  ]);
};
