import React, { useState } from 'react' // UseState is a React Hook 
import { v4 as uuidv4 } from 'uuid' // Imports UUIDv4 (Universally Unique Identifiers version 4) To create unique Identifiers
import { TodoForm } from './TodoForm' // Import Functional Component TodoForm from file TodoForm
import { Todo } from './Todo' // Import Functional Component Todo from file Todo
import { EditTodoForm } from './EditTodoForm' // Import Functional Component EditTodoForm from file EditTodoForm

uuidv4()

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]) /* It allows me to add state to a functional component (TodoWrapper)
                                           It returns an array with two values the current state (todos) & 
                                           a function to update (setTodos) */

    const addTodo = todo => { // Creating a new function called addTodo with a single parameter called todo
        // The (...) is a spread operator that creates a new array with the exisiting todos and a new todo object
        setTodos([...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false}])
        /* The new todo object contains id that generated by uuidv4. Task contains the new todo object, 
        Completed is false so the new object won't be saved as a completed task as soon as it's been created,
        isEditing is false so the editing page won't open as soon as a new todo is created*/
        updateHeight();
        /* After updating the (todos) array, the (updateHeight) function is called. This function used to check 
        if the task is overlapping the todo section so it could update the height and keep the task in the 
        correct section.*/
    }

    const toggleComplete = id => { // Function: toggleComplete. Parameter: id
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        /* The map function is used to create a new array where each todo is checked against the provided (id).
        If the (id) matches, a new object is created with the (completed) property toggled (flipped) using 
        (!todo.completed). If the (id) doesn't match, the original (todo) is retained. */
        updateHeight();
    }

    const deleteTodo = id => { // Function: deleteTodo. Parameter: id
        setTodos(todos.filter(todo => todo.id !== id))
        /* The filter function is used to create a new array that includes only the todos whose (id) does not 
        match the provided (id). This filters out the todo with the specified (id) from the array. */
        updateHeight();
    }

    const editTodo = id => { // Function: editTodo. Parameter: id
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo))
        /* The map function is used to create a new array where each todo is checked against the provided (id). 
        If the (id) matches, a new object is created with the (isEditing) property toggled (flipped) using 
        (!todo.isEditing). If the (id) doesn't match, the original (todo) is retained. */
        updateHeight();
    }

    const editTask = (task, id) => { // Function: editTask. Parameter: task, id
        setTodos(todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo))
        /* The map function is used to create a new array where each todo is checked against the provided (id).
        If the (id) matches, a new object is created with the (task) and (isEditing) properties modified:
        - (task) is set to the provided (task) parameter,
        - (isEditing) is toggled (flipped) using (!todo.isEditing).
        If the (id) doesn't match, the original (todo) is retained. */
        updateHeight();
    }

    const updateHeight = () => {
        const todoWrapper = document.querySelector('.TodoWrapper');
        if (todoWrapper) {
            const originalHeight = parseInt(window.getComputedStyle(todoWrapper).getPropertyValue('min-height'));
            const contentHeight = todoWrapper.scrollHeight;
            const newHeight = Math.max(originalHeight, contentHeight);
            todoWrapper.style.minHeight = newHeight + 'px';
        }
    }

    return (
        <div className='TodoWrapper' id='TodoWrapper'>
            <h1>Tasks To Work On!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={todo.id} />
                ) : (
                    <Todo
                        task={todo}
                        key={todo.id}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}
        </div>
    );
    
}