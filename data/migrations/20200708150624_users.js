exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.text('id', 128).unique().primary();
    tbl.varchar('first_name', 128);
    tbl.varchar('last_name', 128);
    tbl.varchar('name', 128);
    tbl.varchar('email', 100).notNullable().unique();
    tbl.varchar('role', 100);
    tbl.boolean('is_employed', 30).defaultTo(true);
    tbl.boolean('is_completed', 30).defaultTo(false);
    tbl.boolean('is_admin', 30).defaultTo(false);
    tbl
      .integer('organization_id')
      .unsigned()
      .references('id')
      .inTable('organization')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
