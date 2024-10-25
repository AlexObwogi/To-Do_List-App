import React, { useContext } from 'react';
import { TodoContext } from '../App';
import './TodoList.css';

const TodoList = () => {
    const { todos, toggleTodo, deleteTodo } = useContext(TodoContext);

    if (todos.length === 0) {
        return <p className="no-todos">No todos yet! Add some to get started.</p>;
    }

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <div className="todo-text" onClick={() => toggleTodo(todo.id)}>
                        {todo.text}
                    </div>
                    <div className="todo-timestamp">
                        <small>Added on: {todo.timestamp}</small>
                    </div>
                    <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;


