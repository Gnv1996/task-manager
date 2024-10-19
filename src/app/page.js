"use client";
import { useState, useEffect } from 'react';
import Task from './components/Task'; 
import '../app/styles/TaskManager.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";

export default function TaskManager() {
    const [tasks, setTasks] = useState([]); 
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [searchTerm, setSearchTerm] = useState('');

    // Define priority order
    const priorityOrder = ['high', 'medium', 'low'];

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [
            { id: 1, title: 'Task 1', description: 'Initial Task 1', priority: 'medium', completed: false }
        ];
        setTasks(savedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        // Input validation
        if (!title.trim() || !description.trim()) {
            alert('Please fill out both title and description.');
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
        setPriority('low');
    };

    // Delete a task with confirmation
    const deleteTask = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTasks(tasks.filter(task => task.id !== id));
        }
    };

    // Complete a task
    const completeTask = (id) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    // Edit a task
    const editTask = (id, newTitle, newDescription) => {
        setTasks(
            tasks.map(task =>
                task.id === id ? { ...task, title: newTitle, description: newDescription } : task
            )
        );
    };

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

   
    const sortedTasks = filteredTasks.sort((a, b) => 
        priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
    );

   
    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;

        const regex = new RegExp(`(${searchTerm})`, 'gi'); 
        const parts = text.split(regex); 

        return parts.map((part, index) =>
            part.toLowerCase() === searchTerm.toLowerCase() ? (
                <span key={index} style={{ backgroundColor: 'blue', color: 'white' }}>{part}</span>
            ) : (
                part
            )
        );
    };

    return (
        <div className="task-manager">
            <h1>Task Manager</h1>
            <div className="task-creator">
                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>
                <button onClick={addTask}><IoIosAddCircleOutline /> Add Task</button>
            </div>
            
            <div className="search-bar-container">
                <IoIosSearch className="search-icon" />
                <input
                    className="search-bar"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ul>
                {sortedTasks.map(task => (
                    <Task
                        key={task.id}
                        task={{
                            ...task,
                            title: highlightText(task.title, searchTerm), 
                            description: highlightText(task.description, searchTerm) 
                        }}
                        onComplete={() => completeTask(task.id)}
                        onDelete={() => deleteTask(task.id)}
                        onEdit={editTask}
                    />
                ))}
            </ul>
        </div>
    );
}
