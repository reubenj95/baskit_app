import { join } from 'node:path'
import express from 'express'
import { rmSync } from 'node:fs'
import pantryRoutes from './routes/pantry'

const server = express()
server.use(express.static(join(__dirname, 'public')))

server.get('*', (req, res) => {
  res.sendFile('server/public/index.html')
})

export default server
