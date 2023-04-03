import express from 'express'
const router = express.Router()
import * as db from '../../db'

router.get('/', async (req, res) => {
  try {
    const list = await db.getLatestFridgeList()
    const listItems = await db.getFridgeList(list.id)
    res.json(listItems)
  } catch (err) {
    console.log(err)
  }
})

router.get('/latest', async (req, res) => {
  try {
    const listId = await db.getLatestFridgeList()
    res.json(listId)
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
router.post('/:listId', async (req, res) => {
  await db.addNewToFridgeList(Number(req.params.listId), req.body.itemId, 1234)
  res.json({ message: 'Mischief managed' })
})

router.delete('/:listId', async (req, res) => {
  const response = await db.deleteFridgeList(Number(req.params.listId))
  if (response >= 1) {
    res.json({ message: `${response} fridge list deleted` })
  } else {
    res.json({ message: `List not found` })
  }
})

router.delete('/:listId/:itemId', async (req, res) => {
  await db.removeFromFridgeList(
    Number(req.params.listId),
    Number(req.params.itemId)
  )
  const response = await db.getFridgeList(Number(req.params.listId))
  console.log('route', response)
  res.json(response)
})

export default router
