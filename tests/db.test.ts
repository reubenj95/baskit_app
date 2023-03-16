import knex from 'knex'
import config from '../knexfile'
const testConnection = knex(config.test)

import { addItemsToPantry } from '../db'

beforeAll(() => {
  return testConnection.migrate.latest()
})

beforeEach(() => {
  return testConnection.seed.run()
})

describe('Pantry Items DB Functions', () => {
  it('Should add a single pantry item to the database', async () => {
    const pantryItem = [
      {
        quantity: 6,
        name: 'Apples',
        category: null,
        brand: null,
        image: '',
        best_before: null,
        is_fav: false,
        created_by: 1234,
      },
    ]
    const ids = await addItemsToPantry(pantryItem, testConnection)
    const itemId = ids[0]

    const EXPECTED_LENGTH = 11
    const EXPECTED_ID = 11

    const allPantryItems = await testConnection('pantry_items').select()
    const newPantryItem = await testConnection('pantry_items')
      .select()
      .where({ id: itemId })
      .first()

    expect(allPantryItems).toHaveLength(EXPECTED_LENGTH)
    expect(newPantryItem).toEqual({
      id: 11,
      quantity: 6,
      name: 'Apples',
      category: null,
      brand: null,
      image: '',
      best_before: null,
      is_fav: 0,
      created_by: 1234,
    })
    expect(newPantryItem.id).toBe(EXPECTED_ID)
    expect(newPantryItem.name).toBe('Apples')
  })
  it('Should add multiple pantry items to the database from an array of objects', async () => {
    const pantryItems = [
      {
        quantity: 6,
        name: 'Apples',
        category: 1,
        brand: 2,
        image: '',
        best_before: null,
        is_fav: false,
        created_by: 1234,
      },
      {
        quantity: 13,
        name: 'oranges',
        category: 1,
        brand: 3,
        image: '',
        best_before: null,
        is_fav: false,
        created_by: 1234,
      },
    ]
    await addItemsToPantry(pantryItems, testConnection)

    const EXPECTED_LENGTH = 12
    const allPantryItems = await testConnection('pantry_items').select()

    expect(allPantryItems).toHaveLength(EXPECTED_LENGTH)
    expect(allPantryItems[10]).toEqual({
      id: 22,
      quantity: 6,
      name: 'Apples',
      category: 1,
      brand: 2,
      image: '',
      best_before: null,
      is_fav: 0,
      created_by: 1234,
    })
    expect(allPantryItems[11]).toEqual({
      id: 23,
      quantity: 13,
      name: 'oranges',
      category: 1,
      brand: 3,
      image: '',
      best_before: null,
      is_fav: 0,
      created_by: 1234,
    })
  })
  it.todo('Should read all pantry item from the database for a given user ID')
  it.todo('Should update a pantry item in the database')
  it.todo('Should delete a pantry item from the database')
})
