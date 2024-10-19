import React, { useState, useEffect } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import PropTypes from 'prop-types';

const Task = ({ task, onComplete, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [error, setError] = useState('');

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
    }, [task]);

    const saveEdit = () => {
        if (title.trim() === '' || description.trim() === '') {
            setError('Title and description cannot be empty.');
            return;
        }
        onEdit(task.id, title, description);
        setIsEditing(false);
        setError('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        } else if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    return (
        <div className={`task ${task.priority} ${task.completed ? 'completed' : ''} ${isEditing ? 'edit-mode' : ''}`}>
            {isEditing ? (
                <div className="edit-container">
                    <input
                        className="edit-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Edit task title"
                        autoFocus
                    />
                    <textarea
                        className="edit-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Edit task description"
                    />
                    {error && <p className="error-message">{error}</p>} {/* Error message */}
                    <div className="edit-container-button">
                        <button className="save-btn" onClick={saveEdit} aria-label="Save task">
                            <FaRegSave /> Save
                        </button>
                        <button className="cancel-btn" onClick={() => setIsEditing(false)} aria-label="Cancel edit">
                            <MdOutlineCancel /> Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="view-container">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <div className="action-buttons">
                        <button className="edit-btn" onClick={() => setIsEditing(true)} aria-label="Edit task">
                            <CiEdit /> Edit
                        </button>
                        <button
    className={`complete-btn ${task.completed ? '' : 'pending'}`}
    onClick={() => onComplete(task.id)}
    aria-label={`Mark as ${task.completed ? 'pending' : 'completed'}`}
>
    <IoCheckmarkCircleOutline /> {task.completed ? 'Completed' : 'Pending'}
</button>

                        <button className="delete-btn" onClick={() => {
                            if (window.confirm('Are you sure you want to delete this task?')) {
                                onDelete(task.id);
                            }
                        }} aria-label="Delete task">
                            <MdDeleteOutline /> Delete
                        </button>
                        <h5>{task.completed ? 'Completed' : 'Pending'}</h5>
                    </div>
                </div>
            )}
        </div>
    );
};

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        priority: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onComplete: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};

export default Task;
