import express from 'express'

import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodo,
} from '../controllers/todo.controller'

const router = express.Router()

router.get('/', getTodo)
router.post('/add', addTodo)
router.put('/edit/:id', editTodo)
router.delete('/delete/:id', deleteTodo)

export default router
