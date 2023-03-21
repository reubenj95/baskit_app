import express from 'express'
const router = express.Router()
import * as db from '../../db'

router.get('/', async (_req, res) => {
  try {
    const authLayer = 1234
    const data = await db.getPantryItems(authLayer)
    res.json(data)
  } catch (err) {
    console.log(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const { quantity, name, category, brand, image, best_before, is_fav } =
      req.body
    const authLayer = 1234
    const response = await db.addItemsToPantry([
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
  } catch (err) {
    console.log(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const data = await db.getOnePantryItem(Number(req.params.id))
    res.json(data)
  } catch (err) {
    console.log(err)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    console.log(req.body)
    await db.updatePantryItem(Number(req.params.id), req.body)
    res.send('It finished')
  } catch (err) {
    console.log(err)
  }
})

export default router
