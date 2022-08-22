import create from 'zustand'

import { generateId } from '../helpers'

interface ITask {
  id: string
  title: string
  createdAt: number
}

interface IToDoStore {
  tasks: ITask[]
  createTask: (title: string) => void
  updateTask: (id: string, title: string) => void
  removeTask: (id: string) => void
}

export const useToDoStore = create<IToDoStore>((set, get) => ({
  tasks: [
    {
      id: generateId(),
      title: 'Default Task',
      createdAt: Date.now(),
    },
  ],
  createTask: (title) => {
    const { tasks } = get() // get the 'tasks' from store. get() returns all store
    // console.log(get(), tasks, 33) // DEBUG

    const newTask = {
      id: generateId(),
      title,
      createdAt: Date.now(),
    }

    // set the new 'tasks' state value - take new task and concat previous array with tasks, so that new task is always at the beginning - triggers component rerender
    set({
      //   tasks: [newTask].concat(tasks), // not mutating current 'tasks' array
      tasks: [newTask, ...tasks], // not mutating current 'tasks' array
    })
  },
  updateTask: (id, newTitle) => {
    const { tasks } = get()

    // update only title of task with 'id' passed in as a function argument
    set({
      tasks: tasks.map((task) => ({
        ...task,
        title: task.id === id ? newTitle : task.title,
      })),
    })
  },
  removeTask: (id) => {
    const { tasks } = get()

    // remove task by ID - filtering array,
    set({
      tasks: tasks.filter((task) => task.id !== id),
    })
  },
}))
