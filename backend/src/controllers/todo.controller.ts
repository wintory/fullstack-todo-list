import { Request, Response } from 'express'
import { ITodoSchema } from '../models/todo.model'
import {
  createTodo,
  deleteTodo,
  editTodo,
  getTodo,
} from '../services/todo.service'

export const getTodoController = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const todos = await getTodo()
    res.status(200).json(todos)
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to get Todo List' })
  }
}

export const addTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
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

      await createTodo(createdObj)

      res.status(201).json({ message: 'Success to add Todo' })
    }
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to add Todo' })
  }
}

export const editTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const editedId = req.params.id

    if (editedId) {
      await editTodo(editedId, req.body)
      res.status(201).json({ message: 'Success to edit Todo' })
    } else {
      res.status(404).json('Item not do not found')
    }
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to edit Todo' })
  }
}

export const deleteTodoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const removedId = req.params.id

    if (!removedId) {
      res.status(404).json('Item not do not found')
    } else {
      await deleteTodo(removedId)

      res.status(200).json({ message: 'Success to remove Todo' })
    }
  } catch (err) {
    console.log({ err })
    res.status(500).json({ message: 'Failed to remove Todo' })
  }
}
