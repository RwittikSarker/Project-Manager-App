import "./AddProjectPage.css";
import "./EditProjectPage.css";
import "./global.css";

const EditProjectPage = () => {
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
                <h3 className="add-project-btn"> Edit Project</h3>
            </div>

            <div className="form-container">
                <form className="add-project-form">
                    <div className="form-group">
                        <label htmlFor="projectId">
                            <span className="icon"></span> Project ID
                        </label>
                        <input type="text" id="projectId" placeholder="Enter Project ID" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="projectDescription">
                            <span className="icon"></span> Project Description
                        </label>
                        <input
                            type="text"
                            id="projectDescription"
                            placeholder="Enter Project Description"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">
                            <span className="icon"></span> Date
                        </label>
                        <input type="date" id="date" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="status">
                            <span className="icon"></span> Status
                        </label>
                        <input type="text" id="status" placeholder="Enter Status" />
                    </div>

                    <button type="submit" className="save-btn">Save</button>
                </form>
            </div>
        </div>
    );
};

export default EditProjectPage;
