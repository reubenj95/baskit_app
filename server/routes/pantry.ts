import express from 'express'
const router = express.Router()
import {
  addItemsToPantry,
  getPantryItems,
  getOnePantryItem,
  updatePantryItem,
  deletePantryItem,
} from '../../db'

router.get('/', async (_req, res) => {
  const authLayer = 1234
  const data = await getPantryItems(authLayer)
  res.json(data)
})

router.post('/', async (req, res) => {
  const { quantity, name, category, brand, image, best_before, is_fav } =
    req.body
  const authLayer = 1234
  const response = await addItemsToPantry([
    {
      quantity,
      name,
      category,
      brand,
      image,
      best_before,
      is_fav,
      created_by: authLayer,
    },
  ])
  res.send('Added item with id ' + response + ' to the database')
})

router.get('/:id', async (req, res) => {
  const data = await getOnePantryItem(Number(req.params.id))
  res.json(data)
})

router.patch('/:id', async (req, res) => {
  try {
    console.log(req.body)
    await updatePantryItem(Number(req.params.id), req.body)
    res.send('It finished')
  } catch (err) {
    console.log(err)
  }
})

export default router
