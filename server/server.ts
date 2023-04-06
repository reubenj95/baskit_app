import { join } from 'node:path'
import express from 'express'
import pantryRoutes from './routes/pantry'
import fridgeRoutes from './routes/fridge'
import categoryRoutes from './routes/categories'

const server = express()
server.use(express.static(join(__dirname, 'public')))
server.use(express.json())
server.use('/api/v1/pantry', pantryRoutes)
server.use('/api/v1/fridge', fridgeRoutes)
server.use('/api/v1/categories', categoryRoutes)

server.get('*', (req, res) => {
  res.sendFile(
    '/Users/reubenjensen/Documents/devAcademy/personal-project/server/public/index.html'
  )
})

export default server
