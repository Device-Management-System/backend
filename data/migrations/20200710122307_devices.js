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
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('devices');
};
