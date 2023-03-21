/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    {
      id: 1,
      name: 'Produce',
      icon: 'fa-avocado',
      colour: '#fc0011',
      created_by: 1234,
    },
    {
      id: 2,
      name: 'Protein',
      icon: 'fa-meat',
      colour: '#fc7a00',
      created_by: 1234,
    },
    {
      id: 3,
      name: 'Pantry Staples',
      icon: 'fa-salt-shaker',
      colour: '#00db3e',
      created_by: 1234,
    },
    {
      id: 4,
      name: 'Carbs',
      icon: 'fa-bread-slice',
      colour: '#ffd000',
      created_by: 1234,
    },
    {
      id: 5,
      name: 'Cleaning',
      icon: 'fa-spray-can-sparkles',
      colour: '#21cfb2',
      created_by: 1234,
    },
    {
      id: 6,
      name: 'Personal Hygiene',
      icon: 'fa-toothbrush',
      colour: '#9b05f2',
      created_by: 1234,
    },
  ])
}
