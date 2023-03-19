import knex from 'knex'
import config from './knexfile'
const connection = knex(config.development)
import { PantryItem } from './interface'

// ~~~ Pantry Items Endpoints ~~~ //

export function addItemsToPantry(item: PantryItem[], db = connection) {
  return db('pantry_items').insert(item)
}

export function getPantryItems(userId: number, db = connection) {
  return db('pantry_items').where('created_by', userId)
}

export function getOnePantryItem(itemId: number, db = connection) {
  return db('pantry_items').select().where('id', itemId).first()
}

export function updatePantryItem(
  itemId: number,
  updates: any,
  db = connection
) {
  return db('pantry_items').where('id', itemId).update(updates, ['name'])
}

export function deletePantryItem(itemId: number, db = connection) {
  return db('pantry_items').where('id', itemId).del()
}
