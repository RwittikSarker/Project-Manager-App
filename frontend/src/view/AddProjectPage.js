import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";
import "./AddProjectPage.css";
import "./global.css";

const AddProjectPage = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const history = useHistory();

    const [projectName, setProjectName] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();

        if (!projectName) {
            alert("Project name is required");
            return;
        }

        try {
            const endpoint = `http://localhost:1634/user/${userId}/projects/add`;
            console.log("User ID from params:", userId);
            const req = new Request(
                endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: projectName }),
            });
            console.log(req);
            const response = await fetch(req);
            console.log(response);
            if (response.ok) {
                const data = await response.json();
                alert("Project added successfully!");
                history.push("/projects", { userId: userId });
            } else {
                const errorData = await response.json();
                alert(errorData.error || "An error occurred");
            }
        } catch (error) {
            console.error("Error saving project:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="add-project-page">
            <header className="navbar">
                <div className="navbar-links">
                    <a onClick={() => history.push("/profile", { userId: userId })}>Profile</a>
                    <a onClick={() => history.push("/projects", { userId: userId })}>Projects</a>
                    <a href="#contact">Contact <span>&#9660;</span></a>
                </div>
                <div className="navbar-actions">
                    <a href="#dashboard">Dashboard</a>
                    <button className="logout-btn">Log Out</button>
                </div>
            </header>
            <div className="header-bar">
                <h3 className="add-project-btn">+ Add New Project</h3>
            </div>

            <div className="form-container">
                <form className="add-project-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="save-btn">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddProjectPage;
