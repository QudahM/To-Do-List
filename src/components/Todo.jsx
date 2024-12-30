import React from 'react'; // Import from react library to create React components
import PropTypes from 'prop-types'; // Import PropTypes for props validation
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // This is used for rendering Font Awesome icons in the React application
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'; // This is the pen to squre icon used to let the user know where to edit the task
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // This is the trash/delete icon used to delete the task by the user
export const Todo = ({ task, toggleComplete, deleteTodo, editTodo }) => {
    return (
        <div className='Todo'>
            <p
                className={`task-text ${task.completed ? 'completed' : 'incompleted'}`}
                onClick={() => toggleComplete(task._id)}
            >
                {task.task}
            </p>
            <div className="icons-container">
                <FontAwesomeIcon
                    className="edit-icon"
                    icon={faPenToSquare}
                    onClick={() => editTodo(task._id)}
                />
                <FontAwesomeIcon
                    className="delete-icon"
                    icon={faTrash}
                    onClick={() => deleteTodo(task._id)}
                />
            </div>
        </div>
    );
};

Todo.propTypes = {
    task: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired
    }).isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired
};
