import React from 'react'

export default function todo({todo, toggleTodo}) {
  function handleTOdoClick () {
    toggleTodo(todo.id)
  }
  return (
    <label>
       <div>
        <input type='checkbox' checked = {todo.complete} onChange={handleTOdoClick}>

        </input>
        {todo.name} 
      </div>
    </label>
  )
}
