/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      id: 1234,
      friendly_name: 'Bellamy',
      username: 'BellyBoo_23',
      email: 'bellamy_the_staffy@gmail.com',
      password: 'secureHashedPW1234',
      role: 'default',
    },
  ])
}
