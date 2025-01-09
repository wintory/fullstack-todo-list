import TodoModel, { ITodoSchema } from '../models/todo.model'

export const getTodo = async () => {
  const todos = await TodoModel.find()
  return todos
}

export const createTodo = async (data: ITodoSchema) => {
  const todo = await TodoModel.create(data)
  return todo
}

export const editTodo = async (id: string, data: ITodoSchema) => {
  console.log({ id, data })

  const todo = await TodoModel.findByIdAndUpdate(id, data)
  return todo
}

export const deleteTodo = async (id: string) => {
  const todo = await TodoModel.findByIdAndDelete(id)
  return todo
}
