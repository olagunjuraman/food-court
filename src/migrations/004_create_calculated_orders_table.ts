exports.up = function (knex) {
  return knex.schema.createTable('calculated_orders', (table) => {
    table.increments('id').primary(); // 'id' is the primary key
    table.integer('order_id');
    table.json('meals');
    table.decimal('total_amount', 8, 2);
    table.boolean('free_delivery');
    table.decimal('delivery_fee', 8, 2);
    table.decimal('service_charge', 8, 2);
    table.json('address_details');

    table.foreign('order_id').references('id').inTable('orders'); // add foreign key constraint
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('calculated_orders');
};
