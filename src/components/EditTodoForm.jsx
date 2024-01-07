import React, { useState } from 'react' /* Import from react library to create React components &
                                           useState a React hook is imported from rect (The useState 
                                           hook is used to manage state in functional components)*/

export const EditTodoForm = ({ editTodo, task }) => { /* Functional Component (TodoForm) Prop (addTodo, task) are passed 
                                                         when the component is used elsewhere in the application. */

    const [value, setValue] = useState(task.task) /* The hook is used to initialize a piece of state named (vale) with the 
                                                     the initial value is (task.task) representing the current task text */
    const handleSubmit = e => {
        e.preventDefault()
        editTodo(value, task.id) // Updates the ToDo with the updated task text (value) and the task ID 
        setValue("")
    }
    //JSX Structure 
    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input
                type="text"
                className='todo-input'
                value={value}
                placeholder='Update Task'
                onChange={(e) => setValue(e.target.value)}
            />
            <button type='submit' className='todo-btn'>
                Update Task
            </button>
        </form>
    );
    
}