import request from 'superagent'
import { FridgeItem } from '../../models/pantryItems'
const rootUrl = '/api/v1'

export async function fetchFridgeItems(): Promise<FridgeItem[]> {
  const response = await request.get(rootUrl + '/fridge')
  return response.body
}
