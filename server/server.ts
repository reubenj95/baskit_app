import { join } from 'node:path'
import express from 'express'
import pantryRoutes from './routes/pantry'

const server = express()
server.use(express.static(join(__dirname, 'public')))
server.use(express.urlencoded({ extended: false }))
server.use('/pantry', pantryRoutes)

server.get('*', (req, res) => {
  res.sendFile('server/public/index.html')
})

export default server
