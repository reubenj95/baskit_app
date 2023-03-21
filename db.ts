import knex from 'knex'
import config from './knexfile'
const connection = knex(config.development)
import { PantryItem } from './interface'

type PantryItemUpdate = Partial<PantryItem>

// ~~~ Pantry Items Endpoints ~~~ //

export function addItemsToPantry(item: PantryItem[], db = connection) {
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

//~~~ Fridge List End points ~~~ //

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

export function getFridgeList(listId: number, db = connection) {
  return db('fridge_lists_pantry_items')
    .join(
      'pantry_items',
      'fridge_lists_pantry_items.list_id',
      'pantry_items.id'
    )
    .select()
    .where('list_id', listId)
}
