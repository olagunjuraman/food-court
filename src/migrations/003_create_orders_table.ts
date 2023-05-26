exports.up = function (knex) {
  return knex.schema.createTable('orders', (table) => {
    table.increments('id').primary(); // 'id' is the primary key
    table.integer('user_id');
    table.boolean('completed');
    table.boolean('cancelled');
    table.boolean('kitchen_cancelled');
    table.boolean('kitchen_accepted');
    table.boolean('kitchen_dispatched');
    table.timestamp('kitchen_dispatched_time');
    table.timestamp('completed_time');
    table.integer('rider_id');
    table.boolean('kitchen_prepared');
    table.boolean('rider_assigned');
    table.boolean('paid');
    table.string('order_code');
    table.string('calculated_order_id');
    table.timestamp('created_at');
    table.timestamp('updated_at');

    table.foreign('user_id').references('id').inTable('users'); // add foreign key constraint
    table.foreign('rider_id').references('id').inTable('riders'); // add foreign key constraint
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('orders');
};
