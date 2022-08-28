import { FC, useCallback, useEffect, useRef, useState } from 'react'

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
  const [checked, setChecked] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [value, setValue] = useState(title) // default value for task editing - current title

  const editTitleInputRef = useRef<HTMLInputElement>(null) // to bind input with clicked 'Edit' button to make input in focus

  //on 'isEditMode' change
  useEffect(() => {
    if (isEditMode) {
      editTitleInputRef?.current?.focus() // set focus attribute for input
    }
  }, [isEditMode])

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          disabled={isEditMode}
          className={styles.inputTaskCheckbox}
          onChange={(e) => {
            setChecked(e.target.checked)

            // set delay for task deletion withafter checkbox clicked
            if (e.target.checked) {
              setTimeout(() => {
                onDone(id) // on checked - delete task
              }, 300)
            }
          }}
        />
        {isEditMode ? (
          <input
            value={value}
            ref={editTitleInputRef} // connect 'ref' to input (input object)
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onEdit(id, value) // update task on push Enter when editing task
                setIsEditMode(false)
              }
            }}
            className={styles.inputTaskEditTitle}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>
      {isEditMode ? (
        <button
          aria-label="Save"
          className={styles.inputTaskSave}
          onClick={() => {
            onEdit(id, value) // update task on click
            setIsEditMode(false)
          }}
        />
      ) : (
        <button
          aria-label="Edit"
          className={styles.inputTaskEdit}
          onClick={() => {
            setIsEditMode(true)
          }}
        />
      )}
      <button
        aria-label="Remove"
        className={styles.inputTaskRemove}
        onClick={() => {
          if (confirm('Are you sure?')) {
            onRemove(id)
          }
        }}
      />
    </div>
  )
}
