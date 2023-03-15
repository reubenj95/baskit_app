/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  knex.schema.createTable('pantry_items', (table) => {
    table.increments('id').primary,
      table.integer('quantity'),
      table.varchar('name'),
      table.integer('category'),
      table.integer('brand'),
      table.varchar('image'),
      table.date('best_before'),
      table.boolean('is_fav'),
      table.integer('created_by')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  knex.schema.dropTable('pantry_items')
}
