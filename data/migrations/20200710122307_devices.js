exports.up = function (knex) {
  return knex.schema.createTable('devices', (tbl) => {
    tbl.increments().primary();
    tbl.varchar('device_model', 255).notNullable();
    tbl.varchar('serial_number', 255).notNullable();
    tbl.string('os', 128).notNullable();
    tbl.string('brand', 128).notNullable();
    tbl.date('created_at').defaultTo(knex.fn.now());
    tbl.boolean('is_active').defaultTo(false);
    tbl.date('last_updated').defaultTo(knex.fn.now());
    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    tbl
      .integer('assign_to_user_id')
      .unsigned()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('devices');
};
