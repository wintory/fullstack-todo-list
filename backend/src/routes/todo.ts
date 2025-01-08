import express from 'express'

import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodo,
} from '../controllers/todoController'

const router = express.Router()

router.get('/', getTodo)
router.post('/add', addTodo)
router.put('/edit/:id', editTodo)
router.delete('/delete/:id', deleteTodo)

export default router
