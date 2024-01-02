import React from 'react' // Import from react library to create React components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' // This is used for rendering Font Awesome icons in the React application
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons' // This is the pen to squre icon used to let the user know where to edit the task
import { faTrash } from '@fortawesome/free-solid-svg-icons' // This is the trash/delete icon used to delete the task by the user

export const Todo = (props) => { /* React Functional component (Todo) that takes a single parameter (props). 
                                    The parameter is an object that contains the properties passed to the component */
    const { task, toggleComplete, deleteTodo, editTodo } = props; // This is Object destructuring, used to extract specific properties from props (task, editTodo, ...)
    //JSX Structure
    return (
        <div className='Todo'>
            <p
                className={`task-text ${task.completed ? "completed" : "incompleted"}`}
                onClick={() => toggleComplete(task.id)}
            >
                {task.task}
            </p>
            <div className="icons-container">
                <FontAwesomeIcon
                    className="edit-icon"
                    icon={faPenToSquare}
                    onClick={() => editTodo(task.id)}
                />
                <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    onClick={() => deleteTodo(task.id)}
                />
            </div>
        </div>
    );
}
