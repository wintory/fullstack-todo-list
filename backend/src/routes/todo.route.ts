import express from 'express'

import {
  addTodoController,
  deleteTodoController,
  editTodoController,
  getTodoController,
} from '../controllers/todo.controller'

const router = express.Router()

router.get('/', getTodoController)
router.post('/add', addTodoController)
router.put('/edit/:id', editTodoController)
router.delete('/delete/:id', deleteTodoController)

export default router
