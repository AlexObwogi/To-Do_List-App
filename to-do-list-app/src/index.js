import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.css';

// Create an error boundary component
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render shows the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log the error to an error reporting service
        console.error("Error captured in Error Boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h2>An error occurred while loading the application.</h2>;
        }

        return this.props.children; 
    }
}

// Main render logic
const root = ReactDOM.createRoot(document.getElementById('root'));

try {
    document.title = "To-Do List App"; // Set the document title
    root.render(
        <Router>
            <ErrorBoundary>
                <App aria-label="Main application for managing to-do tasks" />
            </ErrorBoundary>
        </Router>
    );
} catch (error) {
    console.error("Error rendering the application:", error);
    const rootElement = document.getElementById('root');
    rootElement.innerHTML = '<h2>An error occurred while loading the application.</h2>';
}

