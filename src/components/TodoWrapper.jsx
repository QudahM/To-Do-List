import axios from 'axios'; //API to connect with the server side
import React, { useEffect, useState } from 'react'; // UseState is a React Hook
import { v4 as uuidv4 } from 'uuid'; // Imports UUIDv4 (Universally Unique Identifiers version 4) To create unique Identifiers
import { TodoForm } from './TodoForm'; // Import Functional Component TodoForm from file TodoForm
import { Todo } from './Todo'; // Import Functional Component Todo from file Todo
import { EditTodoForm } from './EditTodoForm'; // Import Functional Component EditTodoForm from file EditTodoForm*/

uuidv4()

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/todos');
            setTodos(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    const addTodo = async (task) => {
        try {
            const res = await axios.post('http://localhost:5000/api/todos', { task });
            setTodos([...todos, res.data]);
        } catch (err) {
            console.error('Error adding task:', err);
        }
    };

    const toggleComplete = async (id) => {
        try {
            const todo = todos.find((todo) => todo._id === id);
            const updatedTodo = { ...todo, completed: !todo.completed };
            const res = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
            setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
        } catch (err) {
            console.error('Error toggling complete:', err);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error("Failed to delete the task:", error);
        }
    };    

    const editTodo = (id) => {
        setTodos(todos.map((todo) => (todo._id === id ? { ...todo, isEditing: true } : todo)));
    };

    const editTask = async (task, id) => {
        try {
            const res = await axios.put(`http://localhost:5000/api/todos/${id}`, { task });
            setTodos(todos.map((todo) => (todo._id === id ? res.data : todo)));
        } catch (err) {
            console.error('Error editing task:', err);
        }
    };

    return (
        <div className='TodoWrapper'>
            <h1>Tasks To Work On!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo) =>
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={todo._id} />
                ) : (
                    <Todo
                        task={todo}
                        key={todo._id}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            )}
        </div>
    );
};