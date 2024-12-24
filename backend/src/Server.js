// Server.js

const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");


const app = express();

// Middleware
app.use(bodyParser.json());

// Connect Database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});




// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a user
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const newUser = await User.create({ firstName, lastName, email, password });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;






// routes/projectRoutes.js
const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Create a project
router.post("/", async (req, res) => {
  try {
    const { projectId, projectName, startDate, endDate, createdBy } = req.body;
    const newProject = await Project.create({ projectId, projectName, startDate, endDate, createdBy });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().populate("createdBy", "firstName lastName");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;