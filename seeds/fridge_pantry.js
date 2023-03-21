/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('fridge_lists_pantry_items').del()
  await knex('fridge_lists_pantry_items').insert([
    { list_id: 1, item_id: 1, added_by: 1234 },
    { list_id: 1, item_id: 2, added_by: 1234 },
    { list_id: 2, item_id: 1, added_by: 1234 },
    { list_id: 2, item_id: 2, added_by: 1234 },
    { list_id: 3, item_id: 2, added_by: 4321 },
  ])
}
