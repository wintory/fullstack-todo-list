import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import FilterButton from './components/FilterButton'
import Form from './components/Form'
import Todo from './components/Todo'

function usePrevious(value) {
  const ref = useRef(null)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
}

const FILTER_NAMES = Object.keys(FILTER_MAP)

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')

  const toggleTaskCompleted = async (id) => {
    const payload = {
      isCompleted: !tasks.find((task) => task.id === id).isCompleted,
    }
    await axios
      .put(`http://localhost:8080/todos/edit/${id}`, payload)
      .then(() => {
        const updatedTasks = tasks.map((task) => {
          if (id === task.id) {
            return { ...task, completed: !task.completed }
          }
          return task
        })
        setTasks(updatedTasks)
      })
  }

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/todos/delete/${id}`).then(() => {
      const remainingTasks = tasks.filter((task) => id !== task.id)
      setTasks(remainingTasks)
    })
  }

  const editTask = async (id, newName) => {
    const payload = {
      title: newName,
    }
    await axios
      .put(`http://localhost:8080/todos/edit/${id}`, payload)
      .then((res) => {
        const newTask = res?.data
        const editedTaskList = tasks.map((task) => {
          return id === task.id ? newTask : task
        })

        setTasks(editedTaskList)
      })
  }

  const taskList = tasks
    ?.filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.title}
        completed={task.isCompleted}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ))

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ))

  const addTask = async (name) => {
    const newTask = { title: name, isCompleted: false }

    await axios.post('http://localhost:8080/todos/add', newTask).then((res) => {
      const newTask = res?.data
      setTasks([...tasks, newTask])
    })
  }

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task'
  const headingText = `${taskList.length} ${tasksNoun} remaining`

  const listHeadingRef = useRef(null)
  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if (tasks.length < prevTaskLength) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength])

  useEffect(() => {
    const getTasks = async () => {
      const res = await axios.get('http://localhost:8080/todos/')
      setTasks(res?.data)
    }

    getTasks()
  }, [])

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        aria-labelledby="list-heading"
        className="todo-list stack-large stack-exception"
        role="list"
      >
        {taskList}
      </ul>
    </div>
  )
}

export default App
