const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const User = require("./createDB");

const app = express();
const PORT = 1634;

mongoose.connect('mongodb://localhost:27017/PMADBmain')
    .then((result) => app.listen(PORT, () => { console.log(`Server running on port ${PORT}`); }));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB!');
});

app.use(bodyParser.json());

function checkAdmin(req, res, next) {
    const isAdmin = req.headers['x-role'] === 'admin';
    console.log(req.headers);
    if (!isAdmin) {
        return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
    next();
}

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