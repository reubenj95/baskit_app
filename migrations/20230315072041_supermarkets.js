/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('supermarkets', (table) => {
    table.increments('id').primary,
      table.text('name'),
      table.decimal('lattitude', 8, 6),
      table.decimal('longitude', 9, 6),
      table.datetime('last_shopped'),
      table.boolean('is_fav'),
      table.integer('created_by')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('supermarkets')
}
