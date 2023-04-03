import express from 'express'
const router = express.Router()
import * as db from '../../db'

router.get('/', async (req, res) => {
  const categories = await db.getCategories()
  res.json(categories)
})

export default router
