import request from 'superagent'
import { PantryItem } from '../models/interface'

export async function getPantryItems(): Promise<PantryItem[]> {
  const response = await request.get('/api/v1/pantry')
  return response.body
}

// export async function deletePantryItem(itemId){
//   const response = await request.delete('/api/v1/)
// }
