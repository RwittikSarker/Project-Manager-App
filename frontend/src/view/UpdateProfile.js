import "./UpdateProfile.css";
import "./global.css";

const EditProfilePage = () => {
    return (
        <div className="edit-profile-page">
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
                    <h2>Rwittik Sarker</h2>
                    <div className="button-group">
                        <button className="edit-profile-btn">Edit Profile</button>
                        <button className="logout-btn">Logout</button>
                    </div>
                </aside>

                <main className="edit-profile-content">
                    <h2>Edit Profile</h2>
                    <form className="edit-profile-form">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter full name" />

                        <label htmlFor="userName">Change User Name</label>
                        <input type="text" id="userName" placeholder="Enter new user name" />

                        <label htmlFor="email">Change Email Address</label>
                        <input type="email" id="email" placeholder="Enter new email address" />

                        <button type="submit" className="update-btn">Update</button>
                    </form>
                </main>
            </div>
        </div>
    );
};

export default EditProfilePage;
