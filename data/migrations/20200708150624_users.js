exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments().primary();
    tbl.varchar('first_name', 30).notNullable();
    tbl.varchar('last_name', 30).notNullable();
    tbl.varchar('email', 100).notNullable();
    tbl.text('uuid').notNullable();
    tbl.varchar('role', 100).notNullable();
    tbl.boolean('is_employed', 30).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
