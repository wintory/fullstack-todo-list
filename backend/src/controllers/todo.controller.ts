import { Request, Response } from 'express'
import { v4 as uuidV4 } from 'uuid'
import { getTodoList } from '../services/todo.service'

export const getTodo = async (_: Request, res: Response): Promise<void> => {
  const todo = await getTodoList()
  res.status(200).json(todo)
}

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const title = req.body.title
  const isCompleted = req.body.isCompleted ?? false
  const createdTime = new Date()
  const todo = (await getTodoList()) || []

  if (!title) {
    res.status(400).json({ items: todo })
  } else {
    const result = {
      id: uuidV4(),
      title,
      isCompleted,
      createdTime: createdTime.toISOString(),
      updatedTime: createdTime.toISOString(),
    }
    todo.push(result)

    res.status(200).json(result)
  }
}

export const editTodo = async (req: Request, res: Response): Promise<void> => {
  const editedId = req.params.id

  if (!editedId) {
    res.status(404).json('Item not do we need middle ware infound')
  } else {
    const todo = (await getTodoList()) || []
    let editedItem = todo.find(({ id }) => id === editedId)

    if (!editedItem) {
      res.status(404).json('Item not do we need middle ware infound')
    } else {
      const newItem = {
        ...editedItem,
        ...req.body,
        updatedTime: new Date().toISOString(),
      }

      res.status(200).json(newItem)
    }
  }
}

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const removedId = req.params.id

  if (!removedId) {
    res.status(404).json('Item not do we need middle ware infound')
  } else {
    const todo = (await getTodoList()) || []
    const removedIdx = todo.findIndex(({ id }) => id === removedId)

    if (removedIdx === -1) {
      res.status(404).json('Item not found')
    } else {
      todo.splice(removedIdx, 1)

      res.status(200).json({ items: todo })
    }
  }
}
