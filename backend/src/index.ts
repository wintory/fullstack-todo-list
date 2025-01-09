import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import TodoRouter from './routes/todo.route'
import { connectDB } from './services/db'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.json())
app.use(cors())

app.post('/', (req: Request, res: Response) => {
  res.send(req.body)
})

app.use('/todos', TodoRouter)

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
