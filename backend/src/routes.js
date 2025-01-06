const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cors = require('cors');

const User = require("./model/User");
const Project = require("./model/Project");
const Task = require("./model/Task");
const createAdminIfNotExist = require("./controller/createAdminIfNotExist");

const app = express();
const PORT = 1634;

app.use(cors());

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/PMADBmain', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully connected to MongoDB!');
        createAdminIfNotExist();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:1634`);
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

app.use(bodyParser.json());

// In-memory user data
const users = [];

// JWT Secret Key
const JWT_SECRET = "your_jwt_secret_key";


function checkAdmin(req, res, next) {
    const isAdmin = req.headers['x-role'] === 'admin';
    console.log(req.headers);
    if (!isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    next();
}

// Sign-Up API
app.post("/signup", async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;
    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
});

// Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    res.json({ message: "Login successful", userId: user.id });
});

// View Project API
app.get("/user/:id/projects", async (req, res) => {
    const userId = req.params.id;

    try {
        // Fetch user by ID and populate the Projects array
        const user = await User.findById(userId).populate("projects"); // Assuming `Projects` holds ObjectIds referencing the `Project` model
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has projects
        const projects = user.projects || [];
        if (projects.length === 0) {
            return res.status(200).json({ message: "No Projects", projects: projects });
        }

        // Return the populated projects
        res.status(200).json({ projects: projects });
    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Add Project API
app.post("/user/:id/projects/add", async (req, res) => {
    const { name } = req.body;
    const userId = req.params.id;

    if (!name) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        // Create a new project
        const newProject = new Project({ name });
        const savedProject = await newProject.save();

        // Update the user's projects array
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { projects: savedProject._id } },
            { new: true } // Return the updated user document
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(201).json({ message: "Project added successfully", project: savedProject });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ error: "An error occurred while adding the project" });
    }
});


// Admin View API
app.get("/admin/users", async (req, res) => {
    try {
        const users = await User.find({})
            .populate("projects", "name")
            .select("firstname lastname username email role permissions activityHistory projects"); // Select relevant fields
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users" });
    }
});


// View Profile API
app.get("/user/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId).populate("projects", "name description");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ error: "An error occurred while fetching the user profile" });
    }
});

// Edit Profile API
app.put("/user/:id", async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { firstname, lastname, email },
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user" });
    }
});

// Change Password API
app.put("/user/:id/pass", async (req, res) => {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    try {
        // Validate inputs
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "New passwords do not match" });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }

        // Find the user
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Verify old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ error: "An error occurred while updating the password" });
    }
});

// View task page
app.get("/projects/:projectId/tasks", async (req, res) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findById(projectId).populate("tasks");
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ tasks: project.tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "No tasks" });
    }
});

// Add task
app.post("/projects/:projectId/tasks/add", async (req, res) => {
    try {
        const { projectId } = req.params;
        const { title, description, prioritylevel, dueDate } = req.body;

        // Validate input
        if (!req.body) {
            console.log(title);
            return res.status(400).json({ error: "Title, priority level, and due date are required." });
        }

        // Find the project
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: "Project not found." });
        }
        console.log("eije ami" + prioritylevel);

        // Create the task
        const task = new Task({
            title: title,
            description: description || "", // Default empty description
            priorityLevel: prioritylevel,
            dueDate: new Date(dueDate), // Ensure dueDate is a Date object
            status: "Pending", // Default status
        });

        // Save the task to the Task collection
        const savedTask = await task.save();

        // Add the task reference to the project's tasks array
        project.tasks.push(savedTask._id);
        await project.save();

        res.status(201).json({
            message: "Task added successfully.",
            task: savedTask,
        });
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});


// Admins can edit user roles and permissions to ensure proper access control.
app.put('/users/:id/admin', checkAdmin, async (req, res) => {
    const { id } = req.params;
    const { role, permissions } = req.body;

    if (!role && !permissions) {
        return res.status(400).json({ error: 'Provide role or permissions to update.' });
    }

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        if (role) user.role = role;
        if (permissions) user.permissions = permissions;

        await user.save();
        res.json({ message: 'User updated successfully.', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Users can view their activity history for a summary of recent actions.
app.get('/users/:id/activity', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json({ activityHistory: user.activityHistory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));