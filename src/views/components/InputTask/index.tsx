import { FC, useCallback, useState } from 'react'

//styles
import styles from './index.module.scss'

interface IInputTaskProps {
  id: string
  title: string

  // TODO: specific 'onDone' function can be added to state to store and show completed tasks
  onDone: (id: string) => void // remove task upon completion - checkbox clicked
  onEdit: (id: string, title: string) => void // update task
  onRemove: (id: string) => void // remove task
}

export const InputTask: FC<IInputTaskProps> = ({
  id,
  title,
  onDone,
  onEdit,
  onRemove,
}) => {
  return <div className={styles.inputTask}>{title}</div>
}
