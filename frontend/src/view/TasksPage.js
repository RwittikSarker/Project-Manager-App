import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./global.css";
import "./TasksPage.css";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("All");
    const history = useHistory();
    const location = useLocation();
    const { projectId, userId } = location.state;

    // Fetch tasks for the selected project
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`http://localhost:1634/projects/${projectId}/tasks`);
                const data = await response.json();

                if (response.ok) {
                    setTasks(data.tasks);
                    if (data.tasks.length === 0) {
                        setMessage("No Tasks");
                    }
                } else {
                    setMessage(data.message || "Failed to fetch tasks");
                }
            } catch (error) {
                console.error("Error fetching tasks:", error);
                setMessage("Network error. Please try again.");
            }
        };

        if (projectId) {
            fetchTasks();
        } else {
            setMessage("Project not selected.");
        }
    }, [projectId]);

    // Navigate to the add task page
    const handleAddTask = () => {
        history.push(`/addtaskpage`, { projectId, userId });
    };

    // Filter tasks based on the selected priority level
    const filteredTasks = selectedPriority === "All"
        ? tasks
        : tasks.filter(task => task.priorityLevel === selectedPriority);

    return (
        <div className="task-page">
            <header className="navbar">
                <div className="navbar-links">
                    <a onClick={() => history.push("/profile", { userId })}>Profile</a>
                    <a onClick={() => history.push("/projects", { userId })}>Projects</a>
                    <a href="#contact">Contact <span>&#9660;</span></a>
                </div>
                <div className="navbar-actions">
                    <a href="#dashboard">Dashboard</a>
                    <button className="logout-btn">Log Out</button>
                </div>
            </header>

            <div className="tasks-header">
                <div className="filter-box">
                    <label htmlFor="priority-filter">Filter by Priority:</label>
                    <select
                        id="priority-filter"
                        value={selectedPriority}
                        onChange={(e) => setSelectedPriority(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <button className="add-task-btn" onClick={handleAddTask}>+ Add Task</button>
            </div>

            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Due Date</th>
                        <th>Priority Level</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task, index) => (
                            <tr key={task._id}>
                                <td>{index + 1}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                                <td>{task.priorityLevel}</td>
                                <td>{task.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">{message || "No Tasks Found"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TasksPage;
