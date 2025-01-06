import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./global.css";
import "./ProjectsPage.css";

const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const history = useHistory();
    const location = useLocation();
    const userId = location.state.userId;

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`http://localhost:1634/user/${userId}/projects`);
                const data = await response.json();

                if (response.ok) {
                    setProjects(data.projects);
                    if (data.projects.length === 0) {
                        setMessage("No Projects");
                    }
                } else {
                    setMessage(data.message || "Failed to fetch projects");
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                setMessage("Network error. Please try again.");
            }
        };

        if (userId) {
            fetchProjects();
        } else {
            setMessage("User not authenticated.");
        }
    }, [userId]);

    const handleProjectClick = (projectId, userId) => {
        history.push("/tasks", { projectId: projectId , userID: userId});
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="projects-page">
            <header className="navbar">
                <div className="navbar-links">
                    <a onClick={() => history.push("/profile", { userId: userId })}>Profile</a>
                    <a onClick={() => history.push("/projects", { userId: userId })}>Projects</a>
                    <a href="#contact">Contact <span>&#9660;</span></a>
                </div>
                <div className="navbar-actions">
                    <a href="#dashboard">Dashboard</a>
                    <button className="logout-btn" onClick={() => history.push("/logout")}>Log Out</button>
                </div>
            </header>
            <div className="projects-header">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search projects..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="add-project-btn" onClick={() => history.push("/addprojectpage", { userId: userId })}>+ Add Project</button>
            </div>

            <table className="projects-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Project Name</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <tr key={project._id} onClick={() => handleProjectClick(project._id)}>
                                <td>{index + 1}</td>
                                <td>{project.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="2">{message || "No Projects Found"}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectsPage;
