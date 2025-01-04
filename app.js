const bodyParser = require('body-parser')
const express = require('express')
const { v4: uuidV4 } = require('uuid')

const PORT = process.env.PORT || 8080
const app = express()
let todo = [
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

app.use(bodyParser.json())

app.get('/todos', (_, res) => {
  res.json({ items: todo })
})

app.post('/todos/add', (req, res) => {
  const title = req.body.title
  const isCompleted = req.body.isCompleted ?? false
  const createdTime = new Date()

  if (!title) return res.sendStatus(400)

  todo.push({
    id: uuidV4(),
    title,
    isCompleted,
    createdTime,
    updatedTime: createdTime,
  })

  res.status(200).json({ items: todo })
})

app.put('/todos/edit/:id', (req, res) => {
  const editedId = req.params.id

  if (!editedId) return res.sendStatus(400)

  const editedItem = todo.find(({ id }) => id === editedId)

  if (!editedItem) {
    return res.status(404).json('Item not found')
  }

  editedItem.title = req.body.title
  editedItem.isCompleted = req.body.isCompleted
  editedItem.updatedTime = new Date()

  res.status(200).json({ item: editedItem })
})

app.delete('/todos/delete/:id', (req, res) => {
  const removedId = req.params.id

  if (!removedId) return res.sendStatus(400)

  const removedIdx = todo.findIndex(({ id }) => id === removedId)

  if (removedIdx === -1) {
    return res.status(404).json('Item not found')
  }

  todo.splice(removedIdx, 1)

  res.status(200).json({ items: todo })
})

app.post('/todos/clear', (_, res) => {
  todo = []

  res.json('Items removed')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
