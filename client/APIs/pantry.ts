import request from 'superagent'
import { FridgeItem, PantryItem } from '../../models/pantryItems'

export async function fetchPantryItems(): Promise<PantryItem[]> {
  const response = await request.get('/api/v1/pantry')
  return response.body
}

export async function fetchOnePantryItem(id: number) {
  const response = await request.get(`/api/v1/pantry/${id}`)
  return response.body
}

export async function addToPantry(item: FridgeItem) {
  const itemId = await request.post('/api/v1/pantry').send(item)
  const allItems = await request.get('/api/v1/pantry')
  const response = [itemId.body, allItems.body]
  return response
}

// export async function deletePantryItem(itemId){
//   const response = await request.delete('/api/v1/)
// }
