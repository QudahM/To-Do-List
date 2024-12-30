import React, { useState } from 'react' /* Import from react library to create React components &
                                           useState a React hook is imported from rect (The useState 
                                            hook is used to manage state in functional components)*/

export const TodoForm = ({ addTodo }) => { // Functional Component (TodoForm) Prop (addTodo) used to add a new task to the to-do list
    
    const [value, setValue] = useState("") /* UseState Hook is used to initialize a state variable named (value) and an initial value 
                                            of an empty string ("") used to store the value entered into the input field*/

    const handleSubmit = e => { // Function that is called when the task is submitted
        e.preventDefault();  // This prevents the default form submission behavior 
        addTodo(value) // Calls the function (addTodo) with the current value (task) 
        setValue("") // Resets the input field by setting the value state to an empty string ("")
    }
    
    //JSX Structure
    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input
                type="text"
                className='todo-input'
                value={value}
                placeholder='What is the task?'
                onChange={(e) => setValue(e.target.value)}
            />
            <button type='submit' className='todo-btn'>
                Add Task
            </button>
        </form>
    );
    
}