import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import TodoRouter from './routes/todo'

const PORT = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())

app.post('/', (req: Request, res: Response) => {
  res.send(req.body)
})

app.use('/todos', TodoRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
