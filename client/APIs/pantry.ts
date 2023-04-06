import request from 'superagent'
import {
  FridgeItem,
  PantryItem,
  PantryItemNoId,
} from '../../models/pantryItems'

async function fetchPantryItems(): Promise<PantryItem[]> {
  const response = await request.get('/api/v1/pantry')
  return response.body
}

async function fetchOnePantryItem(id: number) {
  const response = await request.get(`/api/v1/pantry/${id}`)
  return response.body
}

async function updatePantryItem(itemUpdates: Partial<PantryItemNoId>) {
  const response = await request
    .patch(`/api/v1/pantry/${itemUpdates.id}`)
    .send(itemUpdates)
  return response.body
}

async function addToPantry(item: FridgeItem) {
  const itemId = await request.post('/api/v1/pantry').send(item)
  const allItems = await request.get('/api/v1/pantry')
  const response = [itemId.body, allItems.body]
  return response
}

async function deletePantryItem(itemId: number) {
  await request.delete(`/api/v1/pantry/${itemId}`)
  const response = await request.get('/api/v1/pantry')
  return response.body
}

export default {
  addToPantry,
  fetchOnePantryItem,
  fetchPantryItems,
  updatePantryItem,
  deletePantryItem,
}
