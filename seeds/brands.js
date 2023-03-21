/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('brands').del()
  await knex('brands').insert([
    { id: 1, name: 'Pams', image: '', colour: '#fc0011', created_by: 1234 },
    { id: 2, name: 'Kellogs', image: '', colour: '#fc7a00', created_by: 1234 },
    {
      id: 3,
      name: 'Duck Island',
      image: '',
      colour: '#00db3e',
      created_by: 1234,
    },
    { id: 4, name: 'Hings', image: '', colour: '#ffd000', created_by: 1234 },
    { id: 5, name: 'Purina', image: '', colour: '#21cfb2', created_by: 1234 },
    {
      id: 6,
      name: 'Eco-store',
      image: '',
      colour: '#9b05f2',
      created_by: 1234,
    },
  ])
}
