import React, { createContext } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import NotFound from './components/NotFound';
import useLocalStorage from './hooks/useLocalStorage';
import { getTimestamp } from './utils/getTimestamp';
import { generateId } from './utils/generateId';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Creating the TodoContext
export const TodoContext = createContext();

const App = () => {
    // Using the custom hook to persist todos in local storage
    const [todos, setTodos] = useLocalStorage('todos', []);

    // Function to add a new todo with unique ID and timestamp
    const addTodo = (todo) => {
        if (!todo.trim()) {
            alert("Todo cannot be empty!");
            return;
        }
        setTodos((prevTodos) => [
            ...prevTodos,
            { id: generateId(), text: todo, completed: false, timestamp: getTimestamp() },
        ]);
    };

    // Function to toggle the completion status of a todo
    const toggleTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Function to delete a todo by its ID
    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    return (
        <TodoContext.Provider value={{ todos, addTodo, toggleTodo, deleteTodo }}>
            <Router>
                <div className="app">
                    <h1>My Todo List</h1>
                    <Switch>
                        <Route exact path="/" component={TodoList} />
                        <Route path="/add" component={AddTodo} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        </TodoContext.Provider>
    );
};

export default App;

