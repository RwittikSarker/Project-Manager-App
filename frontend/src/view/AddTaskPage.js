import { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./AddTaskPage.css";
import "./global.css";

const AddTaskPage = () => {
    const location = useLocation();
    const { userId, projectId } = location.state;
    const history = useHistory();

    const [title, setTaskName] = useState("");
    const [description, setDescription] = useState("");
    const [prioritylevel, setPriority] = useState("Low");
    const [dueDate, setDueDate] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();

        if (!title) {
            alert("Task name is required");
            return;
        }

        try {
            const endpoint = `http://localhost:1634/projects/${projectId}/tasks/add`;
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    description,
                    prioritylevel: prioritylevel,
                    dueDate,
                }),
            });

            if (response.ok) {
                alert("Task added successfully!");
                history.push("/tasks", { userId: userId, projectId: projectId });
            } else {
                const errorData = await response.json();
                alert(errorData.error || "An error occurred");
            }
        } catch (error) {
            console.error("Error saving task:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="add-task-page">
            <header className="navbar">
                <div className="navbar-links">
                    <a onClick={() => history.push("/projects")}>Projects</a>
                    <a href="#contact">Contact <span>&#9660;</span></a>
                </div>
                <div className="navbar-actions">
                    <a href="#dashboard">Dashboard</a>
                    <button className="logout-btn" onClick={() => history.push("/logout")}>Log Out</button>
                </div>
            </header>

            <div className="header-bar">
                <h3 className="add-task-btn">+ Add New Task</h3>
            </div>

            <div className="form-container1">
                <form className="add-task-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="name">Task Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Task Name"
                            value={title}
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Enter Task Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="priority">Priority</label>
                        <select
                            id="priority"
                            value={prioritylevel}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="save-btn">Save Task</button>
                </form>
            </div>
        </div>
    );
};

export default AddTaskPage;
