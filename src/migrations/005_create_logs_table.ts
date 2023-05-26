exports.up = function (knex) {
  return knex.schema.createTable('logs', (table) => {
    table.increments('id').primary();
    table.integer('order_id');
    table.timestamp('time');
    table.text('description');

    table.foreign('order_id').references('id').inTable('orders'); // add foreign key constraint
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('logs');
};
