import React, { useState, useContext } from 'react';
import { TodoContext } from '../App';
import './AddTodo.css';

const AddTodo = () => {
    const { addTodo } = useContext(TodoContext);
    const [input, setInput] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInput(e.target.value);
        setError(null); // Reset error when user starts typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') {
            setError("Todo cannot be empty!");
            return;
        }
        addTodo(input);
        setInput(''); // Clear input after adding
    };

    return (
        <div className="add-todo">
            <h2>Add a New Todo</h2>
            <form onSubmit={handleSubmit} aria-label="Add a new todo">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter a new task..."
                    aria-label="New todo"
                    className={error ? "input-error" : ""}
                />
                <button type="submit" disabled={!input.trim()}>
                    Add Todo
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

