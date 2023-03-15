/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('shopping_lists_pantry_items', (table) => {
    table.integer('item_id').references('id').inTable('pantry_items'),
      table.integer('list_id').references('id').inTable('shopping_lists'),
      table.decimal('price', 5, 2)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('shopping_lists_pantry_items')
}
