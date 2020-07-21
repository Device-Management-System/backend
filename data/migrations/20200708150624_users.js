exports.up = function (knex) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments().primary();
    tbl.varchar('name', 30).notNullable();
    tbl.varchar('email', 100).notNullable().unique();
    tbl.text('uuid').notNullable().unique();
    tbl.varchar('role', 100);
    tbl.boolean('is_employed', 30).defaultTo(true);
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
  return (
    knex.schema
      // .dropTableIfExists('requests')
      // .dropTableIfExists('devices')
      .dropTableIfExists('users')
  );
};
