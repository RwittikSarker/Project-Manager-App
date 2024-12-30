import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProfilePage.css";
import "./global.css";

const ProfilePage = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const history = useHistory();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState({ name: false, email: false });
    const [updatedName, setUpdatedName] = useState("");
    const [updatedEmail, setUpdatedEmail] = useState("");

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`http://localhost:1634/user/${userId}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const data = await response.json();
                setUser(data);
                setUpdatedName(`${data.firstname} ${data.lastname}`);
                setUpdatedEmail(data.email);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchUserProfile();
        } else {
            setError("No user ID provided");
            setLoading(false);
        }
    }, [userId]);

    const handleSave = async () => {
        const [firstname, lastname] = updatedName.split(" ");

        try {
            const response = await fetch(`http://localhost:1634/user/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, lastname, email: updatedEmail }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            setIsEditing({ name: false, email: false });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div className="loading">Loading profile...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="profile-page">
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

            <div className="profile-container">
                <aside className="sidebar">
                    <ul className="sidebar-links">
                        <li>{user.firstname} {user.lastname}</li>
                        <li>Menu</li>
                        <li>Work</li>
                        <li>Support</li>
                        <li>Setting</li>
                        <a onClick={() => history.push("/changepassword", { userId: userId })}>Change Password</a>
                    </ul>
                </aside>

                <main className="main-content1">
                    <div className="info-card about-card">
                        <h2>About</h2>
                        <p>
                            <strong>Full Name:</strong>
                            {isEditing.name ? (
                                <input
                                    type="text"
                                    value={updatedName}
                                    onChange={(e) => setUpdatedName(e.target.value)}
                                />
                            ) : (
                                <span onClick={() => setIsEditing({ ...isEditing, name: true })}>
                                    {user.firstname} {user.lastname}
                                </span>
                            )}
                        </p>
                        <p>
                            <strong>Email:</strong>
                            {isEditing.email ? (
                                <input
                                    type="email"
                                    value={updatedEmail}
                                    onChange={(e) => setUpdatedEmail(e.target.value)}
                                />
                            ) : (
                                <span onClick={() => setIsEditing({ ...isEditing, email: true })}>
                                    {user.email}
                                </span>
                            )}
                        </p>
                        {isEditing.name || isEditing.email ? (
                            <button onClick={handleSave}>Save</button>
                        ) : null}
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfilePage;
