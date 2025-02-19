import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://sasefied-backend-6vp8.onrender.com";

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await fetch(`${API_URL}/tasks`);
        const data = await response.json();
        setTasks(data);
    };

    const addTask = async (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const response = await fetch(`${API_URL}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ task: newTask }),
        });

        if (response.ok) {
            setNewTask("");
            fetchTasks();
        }
    };

    return (
        <div className="container">
            <h2>To-Do List</h2>
            <form onSubmit={addTask} className="task-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter a task..."
                    className="task-input"
                />
                <button type="submit" className="add-btn">Add Task</button>
            </form>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li key={task.id} className="task-item">{task.task}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;
