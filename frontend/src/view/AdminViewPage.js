import React, { useEffect, useState } from "react";
import "./AdminViewPage.css";

const AdminViewPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingUserId, setEditingUserId] = useState(null);
    const [updatedPermissions, setUpdatedPermissions] = useState([]);

    const defaultPermissions = [
        "createProject",
        "deleteProject",
        "createTask",
        "deleteTask",
    ];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:1634/admin/users");
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleEditPermissions = (userId, permissions) => {
        setEditingUserId(userId);
        setUpdatedPermissions([...permissions]);
    };

    const handlePermissionChange = (permission) => {
        setUpdatedPermissions((prev) =>
            prev.includes(permission)
                ? prev.filter((perm) => perm !== permission)
                : [...prev, permission]
        );
    };

    const savePermissions = async (userId) => {
        try {
            const response = await fetch(`http://localhost:1634/admin/users/${userId}/permissions`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ permissions: updatedPermissions }),
            });

            if (!response.ok) {
                throw new Error("Failed to update permissions");
            }

            const updatedUser = await response.json();
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, permissions: updatedUser.permissions } : user
                )
            );
            setEditingUserId(null);
        } catch (err) {
            console.error("Error updating permissions:", err);
            setError("Failed to update permissions.");
        }
    };

    return (
        <div className="admin-view-page">
            <header className="admin-header">
                <h2>User Management</h2>
            </header>

            {loading ? (
                <div className="loading">Loading users...</div>
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : (
                <div className="table-container">
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Permissions</th>
                                <th>Activity History</th>
                                <th>Projects</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {editingUserId === user._id ? (
                                            <div>
                                                {defaultPermissions.map((permission) => (
                                                    <label key={permission} className="permission-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            checked={updatedPermissions.includes(permission)}
                                                            onChange={() =>
                                                                handlePermissionChange(permission)
                                                            }
                                                        />
                                                        {permission}
                                                    </label>
                                                ))}
                                                <button
                                                    className="save-btn"
                                                    onClick={() => savePermissions(user._id)}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        ) : (
                                            <span
                                                onClick={() =>
                                                    handleEditPermissions(user._id, user.permissions)
                                                }
                                                className="editable-permissions"
                                            >
                                                {user.permissions.length > 0
                                                    ? user.permissions.join(", ")
                                                    : "No Permissions"}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {user.activityHistory.length > 0
                                            ? user.activityHistory.join(", ")
                                            : "No Activity"}
                                    </td>
                                    <td>
                                        {user.projects.length > 0
                                            ? user.projects.join(", ")
                                            : "No Projects"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminViewPage;
