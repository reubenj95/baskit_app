/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('fridge_lists').del()
  await knex('fridge_lists').insert([
    { id: 1, created_at: Date.now(), created_by: 1234 },
    { id: 2, created_at: Date.now(), created_by: 1234 },
    { id: 3, created_at: Date.now(), created_by: 1234 },
  ])
}
