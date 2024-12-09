const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./createDB");

const app = express();
const PORT = 1634;

// Connect to database
mongoose.connect('mongodb://localhost:27017/PMADBmain')
    .then((result) => app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); }));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB!');
});

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
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: "User created successfully" });
});

// Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Missing email or password" });
    }
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", access_token: token });
});

// View Profile API
app.get("/profile", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture || "No picture uploaded",
        });
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
});

// Update Profile API
app.put("/profile", (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const { name, email, profilePicture } = req.body;
        if (name) user.name = name;
        if (email) user.email = email;
        if (profilePicture) user.profilePicture = profilePicture;
        res.json({ message: "Profile updated successfully", user });
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
});


app.put("/change-password", async (req, res) => {
    console.log("Change Password route called"); // Debug line
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
});


// Add admin
app.get('/users/add-admin', (req, res) => {
    const user = new User({
        username: "admin",
        password: "1234",
        role: "admin",
        permissions: "admin"
    });
    user.save()
        .then((res) => { res.send(result) })
        .catch((err) => { console.log(err) });
})

// Admins can edit user roles and permissions to ensure proper access control.
app.put('/users/:id', checkAdmin, async (req, res) => {
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