exports.up = function (knex) {
  return knex.schema.createTable('organization', (tbl) => {
    tbl.increments().primary();
    tbl.varchar('name', 100).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('requests')
    .dropTableIfExists('devices')
    .dropTableIfExists('users')
    .dropTableIfExists('organization');
};
