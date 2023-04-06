import request from 'superagent'
import { Category } from '../../models/pantryItems'

export async function getCategories(): Promise<Category[]> {
  const response = await request.get('/api/v1/categories/')
  return response.body
}

export default { getCategories }
