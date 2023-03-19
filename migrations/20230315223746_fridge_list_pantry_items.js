const { InternalSymbolName } = require('typescript')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('fridge_lists_pantry_items', (table) => {
    table.integer('list_id').references('id').inTable('fridge_lists'),
      table.integer('item_id').references('id').inTable('pantry_items'),
      table.integer('added_by').references('id').inTable('users')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('fridge_lists_pantry_items')
}
