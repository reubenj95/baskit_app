import request from 'superagent'
import { PantryItem } from '../models/interface'

export async function getPantryItems(): Promise<PantryItem[]> {
  const response = await request.get('/api/v1/pantry')
  return response.body
}
