import request from 'superagent'
import { PantryItem, FridgeItem } from '../../models/pantryItems'
const rootUrl = '/api/v1'

export async function fetchFridgeItems(): Promise<PantryItem[]> {
  const response = await request.get(rootUrl + '/fridge')
  return response.body
}
interface ListId {
  id: number
}
export async function fetchLatestFridgeList(): Promise<ListId> {
  const response = await request.get(rootUrl + '/fridge/latest')
  return response.body
}

export async function addItemToFridgeList(listId: number, itemId: number) {
  await request.post(rootUrl + `/fridge/${listId}`).send({ itemId })
  const response = await request.get(rootUrl + '/fridge')
  return response.body
}

export async function removeFromFridgeList(itemId: number, listId: number) {
  const response = await request.delete(`/api/v1/fridge/${listId}/${itemId}`)
  return response.body
}
