/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('supermarkets_categories', (table) => {
    table.integer('category_id').references('id').inTable('categories'),
      table.integer('supermarket_id').references('id').inTable('supermarkets'),
      table.integer('order')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('supermakets_categories')
}
