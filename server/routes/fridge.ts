import express from 'express'
const router = express.Router()
import * as db from '../../db'

router.get('/', async (req, res) => {
  try {
    const list = await db.getLatestFridgeList()
    console.log(list)
    const listItems = await db.getFridgeList(list.id)
    res.json(listItems)
  } catch (err) {
    console.log(err)
  }
})

router.post('/new', async (req, res) => {
  const authLayer = 1234
  try {
    const response = await db.createFridgeList(authLayer)
    res.json({ id: response[0], message: 'The fridge list was created' })
  } catch (err) {
    console.log(err)
  }
})

export default router
