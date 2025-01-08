import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request, Response } from 'express'
import TodoRouter from './routes/todo.route'

const PORT = process.env.PORT || 8080
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/', (req: Request, res: Response) => {
  res.send(req.body)
})

app.use('/todos', TodoRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
