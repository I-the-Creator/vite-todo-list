import { FC, useEffect } from 'react'

//Zustand store
import { useToDoStore } from '../../data/stores/useToDoStore'
import { InputPlus } from '../components/InputPlus'

//styles
import styles from './index.module.scss'

export const App: FC = () => {
  //get the data from store - all states(or state) and functions to handle the states
  const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
    state.tasks,
    state.createTask,
    state.updateTask,
    state.removeTask,
  ])

  // console.log(useToDoStore)   // DEBUG
  console.table(tasks) // DEBUG

  return (
    <article className={styles.article}>
      <h1 className={styles.articleTitle}>To Do App (VITE)</h1>
      <section className={styles.articleSection}>
        {/* update store with value coming from InputPlus*/}
        <InputPlus onAdd={(title) => title && createTask(title)} />
      </section>
      <section className={styles.articleSection}></section>
    </article>
  )
}
