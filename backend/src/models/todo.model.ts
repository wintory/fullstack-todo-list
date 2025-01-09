import mongoose from 'mongoose'

export interface ITodoSchema {
  title: string
  isCompleted: boolean
  createdTime: Date
  updatedTime: Date
}

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isCompleted: { type: Boolean, required: true },
  createdTime: { type: Date, default: new Date() },
  updatedTime: { type: Date, default: new Date() },
})

export default mongoose.model<ITodoSchema>('Todo', TodoSchema)
