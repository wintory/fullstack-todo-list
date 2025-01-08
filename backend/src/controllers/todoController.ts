import { Request, Response } from 'express'
import { v4 as uuidV4 } from 'uuid'
import { TodoData } from '../types/todo'

let todo: TodoData[] = [
  {
    id: 'c4167d79-f894-4132-8335-f7f2f1429a79',
    title: 'test',
    isCompleted: false,
    createdTime: '2025-01-04T06:47:35.842Z',
    updatedTime: '2025-01-04T06:47:35.842Z',
  },
  {
    id: 'd4cb94bb-0219-4336-95b3-00672d679c01',
    title: 'test1',
    isCompleted: false,
    createdTime: '2025-01-04T06:47:38.580Z',
    updatedTime: '2025-01-04T06:47:35.842Z',
  },
  {
    id: 'db076f56-c37e-4e0a-ae1f-a6845d349439',
    title: 'test2',
    isCompleted: false,
    createdTime: '2025-01-04T06:47:40.815Z',
    updatedTime: '2025-01-04T06:47:35.842Z',
  },
]

export const getTodo = (_: Request, res: Response): void => {
  res.status(200).json(todo)
}

export const addTodo = (req: Request, res: Response): void => {
  const title = req.body.title
  const isCompleted = req.body.isCompleted ?? false
  const createdTime = new Date()

  if (!title) res.status(400).json({ items: todo })

  todo.push({
    id: uuidV4(),
    title,
    isCompleted,
    createdTime: createdTime.toISOString(),
    updatedTime: createdTime.toISOString(),
  })

  res.status(200).json({ items: todo })
}

export const editTodo = (req: Request, res: Response): void => {
  const editedId = req.params.id

  if (!editedId) res.sendStatus(400)

  const editedItem = todo.find(({ id }) => id === editedId)

  if (!editedItem) {
    res.status(404).json('Item not do we need middle ware infound')
  }

  if (editedItem?.title) editedItem.title = req.body.title
  if (editedItem?.isCompleted) editedItem.isCompleted = req.body.isCompleted
  if (editedItem?.updatedTime) editedItem.updatedTime = new Date().toISOString()

  res.status(200).json({ item: editedItem })
}

export const deleteTodo = (req: Request, res: Response): void => {
  const removedId = req.params.id

  if (!removedId) res.sendStatus(400)

  const removedIdx = todo.findIndex(({ id }) => id === removedId)

  if (removedIdx === -1) {
    res.status(404).json('Item not found')
  }

  todo.splice(removedIdx, 1)

  res.status(200).json({ items: todo })
}
