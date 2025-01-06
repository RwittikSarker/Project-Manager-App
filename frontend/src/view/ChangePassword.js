import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./global.css";
import "./ChangePassword.css";

const ChangePassword = () => {
    const location = useLocation();
    const userId = location.state.userId;

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSave = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match");
            return;
        }

        try {
            const response = await fetch(`http://localhost:1634/user/${userId}/pass`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword, confirmPassword }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update password");
            }

            setSuccess("Password updated successfully!");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="change-password" style={{ backgroundImage: `url(${require('../resources/change-password.jpeg')})` }}>
            <div className="chp-container">
                <div className="form-container">
                    <h2>Change Password</h2>
                    <form className="add-project-form" onSubmit={handleSave}>
                        <input
                            type="password"
                            placeholder="Old Password*"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="New Password*"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm New Password*"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {error && <div className="error-msg">{error}</div>}
                        {success && <div className="success-msg">{success}</div>}
                        <button type="submit" className="save-btn">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
