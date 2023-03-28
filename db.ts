import knex from 'knex'
import config from './knexfile'
const connection = knex(config.development)
import { PantryItem, PantryItemNoId } from './models/pantryItems'

type PantryItemUpdate = Partial<PantryItem>

// ~~~ Pantry Items DB Funcs ~~~ //

export function addItemsToPantry(item: PantryItemNoId[], db = connection) {
  return db('pantry_items').insert(item)
}

export function getPantryItems(userId: number, db = connection) {
  return db<PantryItem>('pantry_items').select().where('created_by', userId)
}

export function getOnePantryItem(itemId: number, db = connection) {
  return db<PantryItem>('pantry_items').select().where('id', itemId).first()
}

export function updatePantryItem(
  itemId: number,
  updates: PantryItemUpdate,
  db = connection
) {
  return db('pantry_items').where('id', itemId).update(updates, ['name'])
}

export function deletePantryItem(itemId: number, db = connection) {
  return db('pantry_items').where('id', itemId).del()
}

//~~~ Fridge List Db Funcs ~~~ //

export function createFridgeList(userId: number, db = connection) {
  return db('fridge_lists').insert({
    created_at: Date.now(),
    created_by: userId,
  })
}

export function addItemToFridgeList(
  listId: number,
  itemId: number,
  db = connection
) {
  return db('fridge_lists_pantry_items').insert({
    list_id: listId,
    item_id: itemId,
  })
}
export async function getLatestFridgeList(db = connection) {
  const max = await db('fridge_lists').max('created_at').first()
  if (max !== undefined) {
    const result = await db('fridge_lists')
      .select('id')
      .where('created_at', max['max(`created_at`)'])
      .first()
    return result
  }
}

export async function getFridgeList(
  listId: number | undefined,
  db = connection
) {
  const result = await db('fridge_lists_pantry_items')
    .join(
      'pantry_items',
      'fridge_lists_pantry_items.item_id',
      'pantry_items.id'
    )
    .select('id', 'quantity', 'name', 'category')
    .where('list_id', listId)

  return result
}

export function removeFromFridgeList(
  listId: number,
  itemId: number,
  db = connection
) {
  return db('fridge_lists_pantry_items')
    .where({ list_id: listId, item_id: itemId })
    .del()
}

export function deleteFridgeList(id: number, db = connection) {
  return db('fridge_lists').where('id', id).del()
}
