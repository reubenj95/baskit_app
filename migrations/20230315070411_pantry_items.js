/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('pantry_items', (table) => {
    table.increments('id').primary,
      table.integer('quantity'),
      table.text('name'),
      table.integer('category').references('id').inTable('categories'),
      table.integer('brand').references('id').inTable('brands'),
      table.text('image'),
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
  return knex.schema.dropTable('pantry_items')
}
