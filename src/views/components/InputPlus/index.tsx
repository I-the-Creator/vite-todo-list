import { FC, useCallback, useState } from 'react'

//styles
import styles from './index.module.scss'

interface IInputPlusProps {
  onAdd: (title: string) => void
}

export const InputPlus: FC<IInputPlusProps> = ({ onAdd }) => {
  // input state fro controlled input
  const [inputValue, setInputValue] = useState('')

  //* Add task(call the onAdd callback with inputValue) and reset input after task addition
  //! useCallback - to avoid new function creation on each component rerender, only if 'inputValue' changes
  const addTask = useCallback(() => {
    onAdd(inputValue)

    setInputValue('')
  }, [inputValue])

  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        className={styles.inputPlusValue}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            // if 'Enter' pushed on input - run 'addTask' as well
            addTask()
          }
        }}
        placeholder="Enter the task..."
      />

      <button
        onClick={addTask}
        aria-label="Add"
        className={styles.inputPlusButton}
      />
    </div>
  )
}
