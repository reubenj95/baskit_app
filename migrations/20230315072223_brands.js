/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('brands', (table) => {
    table.increments('id').primary,
      table.text('name'),
      table.text('image'),
      table.text('colour'),
      table.integer('created_by')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('brands')
}
