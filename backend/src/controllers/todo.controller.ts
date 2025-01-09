import { Request, Response } from 'express'
import TodoModel, { ITodoSchema } from '../models/todo.model'

export const getTodo = async (_: Request, res: Response): Promise<void> => {
  try {
    const todos = await TodoModel.find({})
    res.status(200).json(todos)
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to get Todo List' })
  }
}

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const title = req.body.title
    const isCompleted = req.body.isCompleted ?? false

    if (!title) {
      res.status(400)
    } else {
      const createdObj = {
        title,
        isCompleted,
      } as ITodoSchema

      await TodoModel.create(createdObj)

      res.status(201).json({ message: 'Success to add Todo' })
    }
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to add Todo' })
  }
}

export const editTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const editedId = req.params.id

    if (!editedId) {
      res.status(404).json('Item not do not found')
    } else {
      const todo = await TodoModel.findByIdAndUpdate(editedId, req.body)

      res.status(201).json({ message: 'Success to edit Todo' })
    }
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to edit Todo' })
  }
}

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const removedId = req.params.id

    if (!removedId) {
      res.status(404).json('Item not do not found')
    } else {
      await TodoModel.findByIdAndDelete(removedId)

      res.status(200).json({ message: 'Success to remove Todo' })
    }
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to remove Todo' })
  }
}
