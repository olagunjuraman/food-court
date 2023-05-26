exports.up = function (knex) {
  return knex.schema.createTable('order_total_amount_histories', (table) => {
    table.increments('id').primary();
    table.integer('order_id');
    table.timestamp('time');
    table.decimal('total_amount', 8, 2);

    table.foreign('order_id').references('id').inTable('orders'); // add foreign key constraint
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('order_total_amount_histories');
};
