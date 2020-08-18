exports.up = function (knex) {
  return knex.schema.alterTable('requests', (tbl) => {
    tbl
      .integer('organization_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('organization')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('requests');
};
