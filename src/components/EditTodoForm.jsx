import React, { useState } from 'react'; /* Import from react library to create React components &
                                           useState a React hook is imported from rect (The useState 
                                           hook is used to manage state in functional components)*/

export const EditTodoForm = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = (e) => {
        e.preventDefault();
        editTodo(value, task._id); // Use `_id` instead of `id` for MongoDB document reference
        setValue('');
    };

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input
                type="text"
                className='todo-input'
                value={value}
                placeholder='Update Task'
                onChange={(e) => setValue(e.target.value)}
            />
            <button type='submit' className='todo-btn'>Update Task</button>
        </form>
    );
};