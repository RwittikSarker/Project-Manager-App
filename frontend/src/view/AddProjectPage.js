import "./AddProjectPage.css";
import "./global.css";

const AddProjectPage = () => {
    return (
        <div className="add-project-page">
            <header className="navbar">
                <div className="navbar-links">
                    <a href="#projects">Projects</a>
                    <a href="#about">About Us</a>
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
                <form className="add-project-form">
                    <div className="form-group">
                        <label htmlFor="projectId">Project ID</label>
                        <input type="text" id="projectId" placeholder="Enter Project ID" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="projectDescription">Project Description</label>
                        <input type="text" id="projectDescription" placeholder="Enter Project Description" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">Status</label>
                        <input type="text" id="status" placeholder="Enter Status" />
                    </div>

                    <button type="submit" className="save-btn">Save</button>
                </form>
            </div>
        </div>
    );
};

export default AddProjectPage;