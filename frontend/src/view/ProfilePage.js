import "./ProfilePage.css";
import "./global.css";

const ProfilePage = () => {
    return (
        <div className="profile-page">
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

            <div className="profile-container">
                <aside className="sidebar">
                    <ul className="sidebar-links">
                        <li>Tanvir Kabir</li>
                        <li>Menu</li>
                        <li>Work</li>
                        <li>Support</li>
                        <li>Setting</li>
                        <li>Change Password</li>
                        <li>Update Profile</li>
                    </ul>
                </aside>

                <main className="main-content">
                    <div className="info-card about-card">
                        <h2>About</h2>
                        <p><strong>Full Name:</strong> Inzamul Kabir Tanvir</p>
                        <p><strong>Email:</strong> inzamul.kabir.tanvir@gmail.com</p>
                    </div>

                    <div className="info-card project-card">
                        <h2>Recent Project</h2>
                        <div className="project-info">
                            <p><strong>Project Name:</strong> **********</p>
                            <p><strong>Project Descriptions:</strong> **********</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
