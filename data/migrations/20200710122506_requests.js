exports.up = function (knex) {
  return knex.schema.createTable('requests', (tbl) => {
    tbl.increments().primary();
    tbl
      .integer('device_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('devices')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl
      .text('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl.varchar('note', 500).notNullable();
    tbl.string('status', 128).defaultTo('Pending');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
