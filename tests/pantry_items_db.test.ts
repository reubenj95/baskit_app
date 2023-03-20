import knex from 'knex'
import config from '../knexfile'
const testConnection = knex(config.test)

import {
  addItemsToPantry,
  getPantryItems,
  getOnePantryItem,
  updatePantryItem,
  deletePantryItem,
} from '../db'

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

    const EXPECTED_LENGTH = 12
    const EXPECTED_ID = 12

    const allPantryItems = await testConnection('pantry_items').select()
    const newPantryItem = await testConnection('pantry_items')
      .select()
      .where({ id: itemId })
      .first()

    expect(allPantryItems).toHaveLength(EXPECTED_LENGTH)
    expect(newPantryItem).toEqual({
      id: EXPECTED_ID,
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

    const EXPECTED_LENGTH = 13
    const allPantryItems = await testConnection('pantry_items').select()

    expect(allPantryItems).toHaveLength(EXPECTED_LENGTH)
    expect(allPantryItems[11]).toEqual({
      id: 24,
      quantity: 6,
      name: 'Apples',
      category: 1,
      brand: 2,
      image: '',
      best_before: null,
      is_fav: 0,
      created_by: 1234,
    })
    expect(allPantryItems[12]).toEqual({
      id: 25,
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
  it('Should read all pantry items from the database for a given user ID', async () => {
    const actual = await getPantryItems(1234, testConnection)
    expect(actual).toHaveLength(10)
    expect(actual[0].name).toBe('Apples')
    expect(actual[3]['quantity']).toBe(1)
    expect(actual[5]['name']).toBe('Tofu')
    expect(actual[9]['quantity']).toBe(24)
  })
  it('Should read one pantry item from the database given an id', async () => {
    const expected = await testConnection('pantry_items')
      .where('id', 39)
      .first()
    expect(await getOnePantryItem(39, testConnection)).toEqual(expected)
  })
  it('Should update a pantry item in the database', async () => {
    const item = {
      quantity: 1,
      name: 'Apple Sausage',
      category: null,
      brand: null,
      image: '',
      best_before: 2023 - 10 - 22,
      is_fav: false,
      created_by: 1234,
    }
    const ids = await addItemsToPantry([item], testConnection)
    await updatePantryItem(ids[0], { name: 'Apple Sauce' }, testConnection)
    const actual = await testConnection('pantry_items')
      .where({ id: ids[0], created_by: 1234 })
      .first()
    expect(actual.name).toBe('Apple Sauce')
    expect(actual.quantity).toBe(1)
    expect(actual.created_by).toBe(1234)
  })

  it('Should delete a pantry item from the database', async () => {
    const allItems = await testConnection('pantry_items').select()
    await deletePantryItem(allItems[0].id, testConnection)
    const actual = await testConnection('pantry_items')
    expect(actual).toHaveLength(allItems.length - 1)
    expect(actual[0].name).toBe('Onions')
  })
})
