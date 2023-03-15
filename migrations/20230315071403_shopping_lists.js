/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('shopping_lists', (table) => {
    table.increments('id').primary,
      table.integer('shopping_list'),
      table.date('shopping_date'),
      table.timestamp('created_at').defaultTo(knex.fn.now()),
      table.integer('created_by')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('shopping_lists')
}
