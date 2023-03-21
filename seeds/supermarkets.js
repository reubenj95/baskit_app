/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('supermarkets').del()
  await knex('supermarkets').insert([
    {
      id: 1,
      name: 'Pak n Save Lower Hutt',
      lattitude: -41.2053826,
      longitude: 74.913372,
      is_fav: true,
      created_by: 1234,
    },
  ])
}
