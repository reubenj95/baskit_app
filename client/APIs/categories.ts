import request from 'superagent'

export async function getCategories() {
  const response = await request.get('/api/v1/categories/')
  return response.body
}

export default { getCategories }
