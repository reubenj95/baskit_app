import knex from 'knex'
import config from './knexfile'
const connection = knex(config.development)
import { PantryItem } from './interface'

// ~~~ Pantry Items Endpoints ~~~ //

export function addItemsToPantry(item: PantryItem[], db = connection) {
  return db('pantry_items').insert(item)
}

export function getPantryItems(id: number, db = connection) {}

export function updatePantryItems(item: PantryItem[], db = connection) {}

export function deletePantryItems(item: PantryItem[], db = connection) {}
