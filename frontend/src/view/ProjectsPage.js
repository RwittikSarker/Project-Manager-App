import "./global.css";
import "./ProjectsPage.css";

const ProjectsPage = () => {
    return (
        <div className="projects-page">
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
            <div className="projects-header">
                <div className="entries-control">
                    <label htmlFor="entries">Show</label>
                    <select id="entries">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                    <span>entries</span>
                </div>
                <div className="search-box">
                    <input type="text" placeholder="Search..." />
                </div>
                <button className="add-project-btn">+ Add Project</button>
            </div>

            <table className="projects-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Project</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#20462</td>
                        <td>Rwittik</td>
                        <td>13/05/2022</td>
                        <td><span className="status completed">Completed</span></td>
                        <td>
                            <button className="edit-btn">✎</button>
                            <button className="delete-btn">🗑</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#20463</td>
                        <td>Tanvir</td>
                        <td>13/05/2022</td>
                        <td><span className="status pending">Pending</span></td>
                        <td>
                            <button className="edit-btn">✎</button>
                            <button className="delete-btn">🗑</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#20464</td>
                        <td>Shovon</td>
                        <td>13/05/2022</td>
                        <td><span className="status canceled">Canceled</span></td>
                        <td>
                            <button className="edit-btn">✎</button>
                            <button className="delete-btn">🗑</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className="pagination">
                <button>Previous</button>
                <button className="active">1</button>
                <button>2</button>
                <button>3</button>
                <button>Next</button>
            </div>
        </div>
    );
};

export default ProjectsPage;
